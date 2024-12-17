import { Test, TestingModule } from '@nestjs/testing';
import { SoilmoistureController } from './soilmoisture.controller';

describe('SoilmoistureController', () => {
  let controller: SoilmoistureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoilmoistureController],
    }).compile();

    controller = module.get<SoilmoistureController>(SoilmoistureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
