import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HistoricalDataService {
  constructor(private prisma: PrismaService) {}

  async getData(start: string, end: string, symbol: string) {
    {
      const startDate = new Date(start);
      const endDate = new Date(end);

      // Validate the dates
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new BadRequestException(
          'Invalid date format. Please provide valid ISO 8601 dates.',
        );
      }

      const rawData = await this.prisma
        .$queryRaw`SELECT * FROM HistoricalPrices WHERE date >= ${start} AND date <= ${end} AND instrument_name = ${symbol}`;
      // console.log(rawData);

      return rawData;
    }
  }

  private parseISODate(dateString: string): Date | null {
    try {
      const parsedDate = new Date(dateString);
      return isNaN(parsedDate.getTime()) ? null : parsedDate;
    } catch (error) {
      return error;
    }
  }
}
