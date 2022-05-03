import * as bcrypt from 'bcryptjs';
import Users from '../database/models/UsersModel';
import User from '../interfaces/user.interface';
import JwtToken from '../utils/jwt.token';

export default class LoginService {
  public static async findUserByEmail(email: string): Promise<User> {
    return Users.findOne({
      where: { email },
    }) as Promise<User>;
  }

  public static async login(email: string, password: string) {
    const user = await this.findUserByEmail(email);
    if (bcrypt.compareSync(password, user.password || '')) {
      const token = JwtToken.sign({
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      });
      return {
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
          email: user.email,
        },
        token };
    }
    return null;
  }
}
