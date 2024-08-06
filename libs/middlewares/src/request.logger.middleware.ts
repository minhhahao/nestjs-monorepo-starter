import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as hyperid from 'hyperid';

interface CustomRequest extends Request {
  id: string;
}

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: CustomRequest, res: Response, next: NextFunction) {
    const hyperidInstance = hyperid();
    req.id = hyperidInstance();
    res.set({ 'x-request-id': req.id });
    next();
  }
}
