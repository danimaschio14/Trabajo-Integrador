import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private loggerReq = new Logger('HTTP REQUEST');
  private loggerResp = new Logger('HTTP RESPONSE');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl, body } = request;
    let startTime = new Date();
    const bodyParseado = JSON.stringify(body)

    this.loggerReq.log(
      `${method} - path: ${originalUrl} - body: ${bodyParseado}` 
    );

    const cleanup = () => {
      response.removeListener('finish', logSuccess)
      response.removeListener('close', logAbort)
      response.removeListener('error', logError)
    }

    const logSuccess = () => {
      let endTime = new Date();
      cleanup()
      const { statusCode } = response;

      this.loggerResp.log(
        `${method} - path: ${originalUrl} - code: ${statusCode} - time: ${endTime.valueOf() - startTime.valueOf()} `
      );
    }

    const logAbort = () => {
      cleanup()
      console.log('Request aborted')
    }

    const logError = err => {
      cleanup()
      console.log(`Request with error: ${err}`)
    }


    response.on('finish', logSuccess) // successful pipe
    response.on('close', logAbort) // aborted pipe
    response.on('error', logError) // pipe with internal error

    next();
  }
}

