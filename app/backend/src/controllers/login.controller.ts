import { Request, Response, NextFunction } from 'express';
import LoginService from '../services/login.service';

export default class LoginController {
  public static async login(req: Request, res: Response, next: NextFunction): Promise<
  Response | undefined> {
    try {
      const { email } = req.body;
      const loginUser = await LoginService.login(email);
      return res.status(200).json(loginUser);
    } catch (Error) {
      next(Error);
    }
  }
}
