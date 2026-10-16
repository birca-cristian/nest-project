import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { STATUS_CODES } from 'http';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    let status = 500;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const body: any = exception.getResponse();
      if (Array.isArray(body.message)) {
        message = body.message.join(', ');
      } else {
        message = body.message ?? exception.message;
      }
    } else if (exception.code === 11000) {
      status = 409;
      message = 'A parcel with this tracking number already exists';
    } else {
      console.error(exception);
    }

    response.status(status).json({
      status: status,
      error: STATUS_CODES[status],
      message: message,
      timestamp: new Date().toISOString(),
    });
  }
}
