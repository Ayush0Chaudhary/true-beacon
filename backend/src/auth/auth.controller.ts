import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }


  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.validateUser(signInDto.username, signInDto.password);
  }

  @Post('register')
  signUp(@Body() signUpDto: Record<string, any>) {
    return this.authService.registerUser(signUpDto.username, signUpDto.password, signUpDto.name);
  }

  @UseGuards(AuthGuard)
  @Get('/status')
  async status(@Req() req: Request) {
    return { status: 'ok', username: req['user'].username };
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async me(@Req() req: Request) {
    // console.log('User:', req['user'].username);
    
    return this.authService.getMe(req['user'].username);
  }
}
