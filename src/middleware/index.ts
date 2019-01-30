import { Request, Response, NextFunction } from 'express';

import { IOptions } from '../interfaces';
import { getPublicIp } from '../utils/ip';
import Store from '../store';

export const init = (options: IOptions) => {
  const { app, path, address } = options;
  app.use(path, middleware);
  Store.cbEndpoint = `${address || getPublicIp()}/callback/`;
};

export const middleware = (req: Request, res: Response, next: NextFunction) => {
  next();
};
