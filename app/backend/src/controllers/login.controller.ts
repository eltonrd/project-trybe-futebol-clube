import { Request, Response } from 'express';
import LoginService from '../services/login.service';

export default class LoginController {
  public static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const loginUser = await LoginService.login(email, password);
      if (loginUser) {
        res.status(200).json(loginUser);
      }
    } catch (error) {
      res.status(401).json({ message: 'Incorrect email or password' });
    }
  }
}
