import { Request, Response, NextFunction } from 'express';

import Store from '../store';

export const chatButtons = (endpoint: string) => {
  Store.endpoint = endpoint;
  return middleware;
};

export const middleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {};
