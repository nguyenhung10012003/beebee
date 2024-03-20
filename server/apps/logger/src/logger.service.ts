import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class MyLoggerService implements LoggerService {
  error(message: any, ...optionalParams: any[]): any {
  }

  log(message: any, ...optionalParams: any[]): any {
  }

  warn(message: any, ...optionalParams: any[]): any {
  }

}
