import express from 'express';
import UserService from '../services/UserService';

const usersRouter = express.Router();

const userService = UserService.instance();

const getUsers = (request: any, response: any) => {
  userService.getUsers().then((results) => {
    response.status(200).json(results.rows)
  }).catch(ex => {
    console.error(ex);
    response.status(500).json('ERROR');
  });
}

const addAndGetUsers = async (request: any, response: any) => {
  userService.saveUsers().then(() => {
    getUsers(request, response);
  }).catch(ex => {
    console.error(ex);
    response.status(500).json('ERROR');
  });
}

/* GET users listing. */
usersRouter.get('/', getUsers);
usersRouter.get('/save', addAndGetUsers);

export default usersRouter;
