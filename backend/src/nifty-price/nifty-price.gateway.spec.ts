import { Test, TestingModule } from '@nestjs/testing';
import { NiftyPriceGateway } from './nifty-price.gateway';

describe('NiftyPriceGateway', () => {
  let gateway: NiftyPriceGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NiftyPriceGateway],
    }).compile();

    gateway = module.get<NiftyPriceGateway>(NiftyPriceGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
