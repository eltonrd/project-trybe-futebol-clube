import * as express from 'express';
import LoginController from '../controllers/login.controller';
import LoginMiddleware from '../middlewares/login.middleware';

const loginRouter = express.Router();

loginRouter.post(
  '/',
  LoginMiddleware.emailValidation,
  LoginMiddleware.passwordValidation,
  LoginController.login,
);
loginRouter.get('/', LoginController.getRole);

export default loginRouter;
