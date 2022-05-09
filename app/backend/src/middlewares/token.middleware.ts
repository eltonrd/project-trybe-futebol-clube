import { Request, Response, NextFunction } from 'express';
import JwtToken from '../utils/jwt.token';

export default class TokenMiddleware {
  public static async verifyToken(req: Request, res: Response, next: NextFunction): Promise<
  Response | void > {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const decoded = JwtToken.verify(token);
      req.body.user = decoded;
      next();
    } catch (Error) {
      next(Error);
    }
  }
}
