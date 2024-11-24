import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { HistoricalDataService } from './historical-data.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('historical-data')
export class HistoricalDataController {
  constructor(private historicalDataService: HistoricalDataService, 
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  async getHistoricalData(
    @Query('from_data') from_data: string,
    @Query('to_data') to_data: string,
    @Query('symbol') symbol: string,
  ) {
    const value = await this.cacheManager.get(`${from_data}-${to_data}-${symbol}`);
    if (value) {
      console.log('Cache hit');
      return value;
    }
    const data = await this.historicalDataService.getData(from_data, to_data, symbol);
    this.cacheManager.set(`${from_data}-${to_data}-${symbol}`, data, 10000);
    return data;
  }
}
