import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HistoricalDataController } from './historical-data/historical-data.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
// import { PrismaModule } from './prisma/prisma.module';
import { HistoricalDataService } from './historical-data/historical-data.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { NiftyPriceGateway } from './nifty-price/nifty-price.gateway';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
    }),
    AuthModule,
    UsersModule,
    CacheModule.register()
  ],
  controllers: [AppController, HistoricalDataController],
  providers: [AppService, PrismaService, HistoricalDataService, NiftyPriceGateway],
})
export class AppModule {}
