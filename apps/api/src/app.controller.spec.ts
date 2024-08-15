import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  it('should return health check status - happy path', () => {
    // Arrange
    const expectedResult = { error: false };
    jest
      .spyOn(appService, 'healthCheck')
      .mockImplementation(() => expectedResult as any);

    // Act
    const result = appController.healthCheck();

    // Assert
    expect(result).toBe(expectedResult);
  });

  it('should handle health check returning null', () => {
    // Arrange
    jest.spyOn(appService, 'healthCheck').mockImplementation(() => null);
  });
});
