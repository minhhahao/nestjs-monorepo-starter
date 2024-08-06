import { Test, TestingModule } from '@nestjs/testing';
import { ExtendsService } from './extends.service';

describe('ExtendsService', () => {
  let service: ExtendsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExtendsService],
    }).compile();

    service = module.get<ExtendsService>(ExtendsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
