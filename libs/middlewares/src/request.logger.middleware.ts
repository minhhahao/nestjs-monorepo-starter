import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as hyperid from 'hyperid';

interface CustomRequest extends Request {
  id: string;
}

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  private httpLogger = new Logger('HTTP');

  use(req: CustomRequest, res: Response, next: NextFunction) {
    const userAgent = req['user-agent'] || '';
    const { ip, method, path: url } = req;

    const hyperidInstance = hyperid();
    req.id = hyperidInstance();
    res.set({ 'x-request-id': req.id });

    res.on('close', () => {
      const { statusCode } = res;
      const contentLength = res['content-length'] || 0;
      this.httpLogger.log(
        `${req.id} - ${method} ${url} - ${statusCode} - ${ip} - ${userAgent} - +${contentLength}ms`,
      );
    });
    return next();
  }
}
