import express from 'express';
import UserService from '../services/UserService';
import Auth from '../configs/Auth';

const userRouter = express.Router();

const userService = UserService.instance();
const auth = Auth.instance();

// const getUsers = (request: any, response: any) => {
//   userService.getUsers().then((results) => {
//     response.status(200).json(results.rows)
//   }).catch(ex => {
//     console.error(ex);
//     response.status(500).json('ERROR');
//   });
// }

// const addAndGetUsers = (request: any, response: any) => {
//   userService.saveUsers().then(() => {
//     getUsers(request, response);
//   }).catch(ex => {
//     console.error(ex);
//     response.status(500).json('ERROR');
//   });
// }

const login = (req: any, res: any) => {
  const user = req.body;
  if (!user) { res.sendStatus(400); return; }
  userService.login(user.email, user.password).then((data) => {
    if (!data || data.rows.length < 1) { res.sendStatus(401); return; }
    res.status(200).json({ accessToken: auth.generateToken(user.email) })
  }).catch(ex => {
    console.error(ex);
    res.status(500).json(ex);
  });
}

const register = (req: any, res: any) => {
  const user = req.body;
  if (!user) { res.sendStatus(400); return; }
  userService.save(user).then((data) => {
    if (!data) { res.status(500).json('ERROR'); }
    res.status(201).json(data.rows[0]);
  }).catch(ex => {
    console.error(ex);
    res.status(500).json(ex);
  });
}

const getAll = (req: any, res: any) => {
  userService.getAll().then((data) => {
    res.status(200).json(data.rows)
  }).catch(ex => {
    console.error(ex);
    res.status(500).json(ex);
  });
}

const getById = (req: any, res: any) => {
  userService.getById(req.params.id).then((data) => {
    res.status(200).json(data.rows[0])
  }).catch(ex => {
    console.error(ex);
    res.status(500).json(ex);
  });
}

userRouter.post('/login', login);
userRouter.post('/register', register);
userRouter.get('/s', getAll);
userRouter.get('/s/:id', getById);

export default userRouter;
