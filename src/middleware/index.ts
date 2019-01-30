import { Request, Response, NextFunction } from 'express';

import Store from '../store';
import { prefetchView } from '../views';

export const chatButtons = (endpoint: string) => {
  Store.endpoint = endpoint;
  return middleware;
};

export const middleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data } = req.query;
    const decoded = decodeURIComponent(data);
    const json = JSON.parse(decoded);

    res.send(prefetchView(json));
  } catch (err) {
    throw new Error(
      `Something went wrong with chat buttons! URL: ${req.originalUrl}`,
    );
  }
};
