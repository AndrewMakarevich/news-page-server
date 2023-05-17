import { Controller, Post, Body, Get, Param, Res } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Response } from 'express';
import { AuthService as AuthServiceClass } from '../service/auth.service';
import { ActivateDto, LoginDto, RegisterDto } from '../auth.dto';
import { REFRESH_TOKEN_COOKIE_NAME } from '../auth.const';
import { UserIp } from 'src/decorators/request/userIp.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private sequelize: Sequelize,
    private AuthService: AuthServiceClass,
  ) {}

  @Post('register')
  async register(@Body() { username, email, password }: RegisterDto) {
    const transaction = await this.sequelize.transaction();

    try {
      const response = await this.AuthService.register({
        username,
        email,
        password,
        transaction,
      });

      await transaction.commit();

      return response;
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  }

  @Get('activate/:activationToken')
  async activate(@Param() { activationToken }: ActivateDto) {
    const transaction = await this.sequelize.transaction();

    try {
      const response = await this.AuthService.activate({
        activationToken,
        transaction,
      });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  }

  @Post('login')
  async login(
    @Body() { username, password }: LoginDto,
    @UserIp() userIp: string | null,
    @Res({ passthrough: true }) res: Response,
  ) {
    const transaction = await this.sequelize.transaction();

    try {
      const { accessToken, refreshToken } = await this.AuthService.login({
        userIp,
        username,
        password,
        transaction,
      });

      await transaction.commit();

      res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken);

      return { accessToken };
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  }
}
