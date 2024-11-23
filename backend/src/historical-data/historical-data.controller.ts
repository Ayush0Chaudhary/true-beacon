import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { HistoricalDataService } from './historical-data.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('historical-data')
export class HistoricalDataController {
  constructor(private historicalDataService: HistoricalDataService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getHistoricalData(
    @Query('from_data') from_data: string,
    @Query('to_data') to_data: string,
    @Query('symbol') symbol: string,
  ) {
    // console.log(from_data, to_data), symbol;

    return await this.historicalDataService.getData(from_data, to_data, symbol);
  }
}
