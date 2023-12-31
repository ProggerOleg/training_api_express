import { Request, Response, NextFunction, Router } from 'express';
import { IMiddleWare } from './middleWare.interface';

export interface IControllerRoute {
  path: string;
  func: (req: Request, res: Response, next: NextFunction) => void;
  method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
  middlewares?: IMiddleWare[];
}

export type ExpressReturnType = Response<any, Record<string, any>>;
