import { Request, Response, NextFunction } from 'express';
import LoginService from '../services/login.service';

export default class LoginController {
  public static async login(req: Request, res: Response, next: NextFunction): Promise<
  Response | void> {
    try {
      const { email } = req.body;
      const loginUser = await LoginService.login(email);
      return res.status(200).json(loginUser);
    } catch (Error) {
      next(Error);
    }
  }

  public static async getRole(req: Request, res: Response, next: NextFunction): Promise<
  Response | void> {
    try {
      const { authorization } = req.headers;
      const user = await LoginService.getRole(authorization as string);
      return res.status(200).json(user.role);
    } catch (Error) {
      next(Error);
    }
  }
}
