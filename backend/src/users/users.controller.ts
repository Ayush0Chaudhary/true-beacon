import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
    constructor(private usersServices: UsersService) { }

    @UseGuards(AuthGuard)
    @Get('portfolio/holdings')
    async getUsersHolding(@Req() req: Request) {
        return this.usersServices.getUsersHoldings(req['user'].username);
    }

    @UseGuards(AuthGuard)
    @Post('/order/place_order')
    async createOrder(@Req() req: Request, @Body() orderDto: Record<string, any>) {
        return this.usersServices.createOrder(req['user'].username, orderDto.symbol, orderDto.quantity, orderDto.price);
    }

}
