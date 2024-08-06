import { Test, TestingModule } from '@nestjs/testing';
import { MiddlewaresService } from './middlewares.service';

describe('MiddlewaresService', () => {
  let service: MiddlewaresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MiddlewaresService],
    }).compile();

    service = module.get<MiddlewaresService>(MiddlewaresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
