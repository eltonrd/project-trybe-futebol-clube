import { Request, Response, NextFunction } from 'express';

export default class LoginMiddleware {
  public static async emailValidation(req: Request, res: Response, next: NextFunction) {
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!emailRegex.test(email)) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    next();
  }

  public static async passwordValidation(req: Request, res: Response, next: NextFunction) {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (password.length <= 6) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    next();
  }
}
