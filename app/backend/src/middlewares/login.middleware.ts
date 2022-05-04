import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcryptjs';
import Users from '../database/models/UsersModel';

export default class LoginMiddleware {
  public static emailValidation(req: Request, res: Response, next: NextFunction) {
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
    const { email } = req.body;
    if (email === '') {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!emailRegex.test(email)) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    next();
  }

  public static async passwordValidation(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (password === '') {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const userPassword = await Users.findOne({ where: { email } });
    if (userPassword) {
      const isPasswordValid = bcrypt.compareSync(password, userPassword.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Incorrect email or password' });
      }
    }
    next();
  }
}
