import * as express from 'express';
import LoginController from '../controllers/login.controller';

const loginRouter = express.Router();

loginRouter.post('/', LoginController.login);

export default loginRouter;
