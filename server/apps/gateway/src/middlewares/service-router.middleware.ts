// Middleware trong dịch vụ cổng
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ServiceRouterMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const serviceName = req.headers['X-Service-Name'];
    console.log(req);
    next();
  }
}
