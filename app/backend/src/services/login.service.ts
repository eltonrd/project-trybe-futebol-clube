import Users from '../database/models/UsersModel';
import User from '../interfaces/user.interface';
import JwtToken from '../utils/jwt.token';

export default class LoginService {
  public static async findUserByEmail(email: string): Promise<User> {
    const user = await Users.findOne({
      where: { email },
    });
    return user as User;
  }

  public static async login(email: string) {
    const user = await this.findUserByEmail(email);
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
}
