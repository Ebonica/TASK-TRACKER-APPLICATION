import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  Get,
  Param,
} from '@nestjs/common';
import { User } from 'src/schemas/user';
import { UsersService } from './users.service';
import * as jwt from 'jsonwebtoken';

@Controller('users')
export class UsersController {
  private readonly secretKey = 'fdkhdsfkdsfhsldjfcsbndsakjfsd'; // Replace with your actual secret key

  constructor(private readonly userService: UsersService) {}

  private generateToken(user: User): string {
    return jwt.sign(
      { username: user.username, userId: user._id },
      this.secretKey,
      { expiresIn: '1h' },
    );
  }

  // sign up
  @Post('/create')
  async create(@Body() user: User): Promise<{ user: User; token: string }> {
    try {
      const createdUser = await this.userService.create(user);
      const token = this.generateToken(createdUser);
      return { user: createdUser, token };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  // Sign-in
  @Post('/signin')
  async signIn(
    @Body() credentials: { username: string; password: string },
  ): Promise<{ user: User; token: string }> {
    try {
      const user = await this.userService.findByUsername(credentials.username);

      if (!user) {
        throw new UnauthorizedException('User not found please sign up');
      }

      const isPasswordValid = await this.userService.comparePasswords(
        credentials.password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password');
      }

      const token = this.generateToken(user);

      return { user, token };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  @Get(':id')
  findOne(@Param(':id') id: string) {
    this.userService.findOne(id);
  }
}
