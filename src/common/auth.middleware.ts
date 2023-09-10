import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { IMiddleWare } from './middleWare.interface';

export class AuthMiddleware implements IMiddleWare {
  constructor(private secret: string) {}

  execute(req: Request, res: Response, next: NextFunction): void {
    if (req.headers.authorization) {
      verify(req.headers.authorization.split(' ')[1], this.secret, (err, payload) => {
        if (err) {
          next();
        } else if (typeof payload === 'object' && payload) {
          payload as JwtPayload;
          req.user = payload.email;
          next();
        }
      });
    }
    next();
  }
}
