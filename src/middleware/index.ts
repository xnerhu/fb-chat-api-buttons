import { Request, Response, NextFunction } from 'express';

import { IOptions } from '../interfaces';
import { getPublicIp } from '../utils/ip';

export const applyChatButtons = (options: IOptions) => {
  const { app, path } = options;
  app.use(path, middleware);

  console.log(getPublicIp());
};

const middleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.connection.remoteAddress);
  next();
};
