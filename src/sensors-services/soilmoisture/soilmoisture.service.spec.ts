import { Test, TestingModule } from '@nestjs/testing';
import { SoilmoistureService } from './soilmoisture.service';

describe('SoilmoistureService', () => {
  let service: SoilmoistureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SoilmoistureService],
    }).compile();

    service = module.get<SoilmoistureService>(SoilmoistureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
