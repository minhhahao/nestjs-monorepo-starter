import { Test, TestingModule } from '@nestjs/testing';
import { RequestIdMiddleware } from './request.logger.middleware';
import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
  id: string;
  ip: string;
  method: string;
  path: string;
}

interface CustomResponse extends Response {}

describe('RequestIdMiddleware', () => {
  let middleware: RequestIdMiddleware;
  let req: CustomRequest;
  let res: Response & CustomResponse;
  let next: NextFunction;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestIdMiddleware],
    }).compile();

    middleware = module.get<RequestIdMiddleware>(RequestIdMiddleware);
    req = {} as CustomRequest;
    res = {} as CustomResponse;
    next = jest.fn();
  });

  it('should set request id and response header', () => {
    const setMock = jest.fn();
    res = {
      set: setMock,
      on: jest.fn((event, callback) => {
        if (event === 'close') {
          callback();
        }
      }),
    } as unknown as Response;
    middleware.use(req, res, next);
    expect(req.id).toBeDefined();
    expect(setMock).toHaveBeenCalledWith({ 'x-request-id': req.id });
    expect(next).toHaveBeenCalled();
  });
});
