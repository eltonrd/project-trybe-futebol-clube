import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

export default class JwtToken {
  private static jwtSecret = fs.readFileSync('jwt.evaluation.key', 'utf8');

  public static sign(payload: object): string {
    return jwt.sign(payload, this.jwtSecret, { expiresIn: '24h', algorithm: 'HS256' });
  }

  public static verify(token: string) {
    return jwt.verify(token, this.jwtSecret, { algorithms: ['HS256'] });
  }
}
