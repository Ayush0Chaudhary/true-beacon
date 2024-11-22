import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HistoricalDataController } from './historical-data/historical-data.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
// import { PrismaModule } from './prisma/prisma.module';
import { HistoricalDataService } from './historical-data/historical-data.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
    }),
  ],
  controllers: [AppController, HistoricalDataController],
  providers: [AppService, PrismaService, HistoricalDataService],
})
export class AppModule {}
