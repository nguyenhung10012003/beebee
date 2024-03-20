import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AllowedAddressesMiddleware implements NestMiddleware {
  private readonly allowedAddresses: string[] = ['127.0.0.1', 'localhost'];

  use(req: Request, res: Response, next: NextFunction) {
    const clientAddress = req.ip;
    const clientHostname = req.hostname;

    if (!this.isAllowed(clientAddress) && !this.isAllowed(clientHostname)) {
      return res.status(403).send('Forbidden');
    }

    next();
  }

  private isAllowed(address: string): boolean {
    return this.allowedAddresses.includes(address);
  }
}
