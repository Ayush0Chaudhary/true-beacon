import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async getMe(username: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user) {
      delete user.password;
      return user;
    } else {
      return new UnauthorizedException();
    }
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (user && this.verifyPassword(password, user.password)) {
      // const { password, ...result } = user;
      const payload = { sub: user.user_id, username: user.user_name };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      return new UnauthorizedException();
    }
  }

  async registerUser(username: string, password: string, name: string): Promise<any> {
    if(!username|| !password  || !name ){
        return new UnauthorizedException();
    }
    const user = await this.usersService.findOne(username);
    if (user) {
      return new UnauthorizedException();
    } else {
        

      const hash = await this.encryptPassword(password);
      const newUser = await this.usersService.create({
        username: username,
        password: hash,
        name: name,
      });
      const payload = { sub: newUser.user_id, username: newUser.user_name };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
  }

  async encryptPassword(password: string): Promise<string> {
    const saltRounds = 10; // Number of salt rounds (higher = more secure, but slower)
    try {
      const hash = await bcrypt.hash(password, saltRounds);
      return hash;
    } catch (err) {
      throw new Error('Error encrypting password: ' + err.message);
    }
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    try {
      const isMatch = await bcrypt.compare(password, hash);
      return isMatch;
    } catch (err) {
      throw new Error('Error verifying password: ' + err.message);
    }
  }
}
