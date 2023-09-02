import { Request, Response, NextFunction, Router } from 'express';

export interface IUserInterface {
  login: (req: Request, res: Response, next: NextFunction) => void;
  register: (req: Request, res: Response, next: NextFunction) => void;
}
