import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ServiceNameMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    req.headers['X-Service-Name'] = 'service1';
    console.log(req.headers['X-Service-Name']);
    next();
  }
}
