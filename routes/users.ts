import express from 'express';
import postgres from '../configs/database.config';
import UserService from '../services/UserService';

const usersRouter = express.Router();

const getUsers = (request: any, response: any) => {
  postgres.postgresPool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  });
}

const addAndGetUsers = async (request: any, response: any) => {
  UserService.instance().saveUsers().then(() => {
    getUsers(request, response);
  }).catch(ex => {
    console.error(ex);
    response.status(500).json('ERROR');
  });
}

/* GET users listing. */
usersRouter.get('/', addAndGetUsers);

export default usersRouter;
