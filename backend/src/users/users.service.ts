import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export type User = {
  user_id: number;
  user_type: string;
  email: string;
  user_name: string;
  broker: string;
  password: string;
};



@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async findOne(username: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: {
        user_name: username,
      },
    });
  }

  async create(data: { username: string, password: string, name: string }): Promise<User> {
    if (!data.username || !data.password || !data.name) {
      throw new Error('Missing required fields');
    }

    const user = await this.findOne(data.username);
    if (user) {
      throw new Error('User already exists');
    }

    return this.prisma.user.create({
      data: {
        user_name: data.username,
        password: data.password,
        name: data.name,
        broker: 'ZERODHA',
        user_type: 'individual',
        email: data.username + "@gmail.com", // Assuming email is the same as username
      }
    });
  }

  async getUsersHoldings(username: string): Promise<any> {

    const user = await this.prisma.user.findUnique({
      where: {
        user_name: username,
      },
      select: {
        user_id: true,
      }, 
    });

    if(!user){
      throw new Error('User not found');
    }
    console.log(user);
    
    return await this.prisma.holdings.findMany({
      where: {
        user: {
          user_id: user.user_id,},
      },
    });
  }

  async createOrder(username: string, symbol: string, quantity: number, price: number): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: {
        user_name: username,
      },
      select: {
        user_id: true,
      }, 
    });

    if(!user){
      throw new Error('User not found');
    }

    const order = await this.prisma.order.create({
      data: {
        symbol: symbol,
        quantity: quantity,
        price: price,
        user: {
          connect: {
            user_id: user.user_id,
          },
        },
      },
    });
    if(!order){
      throw new Error('Order creation failed');
    }
    return { message: 'Order created successfully', order_id: order.id };
  }
}
