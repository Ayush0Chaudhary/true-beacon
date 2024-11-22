import { Test, TestingModule } from '@nestjs/testing';
import { HistoricalDataController } from './historical-data.controller';

describe('HistoricalDataController', () => {
  let controller: HistoricalDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoricalDataController],
    }).compile();

    controller = module.get<HistoricalDataController>(HistoricalDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
