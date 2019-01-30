import { NextFunction, Request, Response } from 'express';
import EventEmitter from 'events';

import { IOptions, IButton } from '../interfaces';
import { getUrl } from '../utils';
import { prefetchView } from '../views/prefetch';

export class ChatButtons extends EventEmitter {
  constructor(public options: IOptions) {
    super();
    options.app.use(options.path, this.middleware);
  }

  public setApi(api: any) {
    this.options.api = api;
  }

  public send(btn: IButton, threadId: string) {
    const { endpoint, api } = this.options;
    const url = getUrl(endpoint, btn, threadId);
    api.sendMessage({ body: url }, threadId);
  }

  private middleware = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { data } = req.query;
      const decoded = decodeURIComponent(data);
      const json = JSON.parse(decoded);

      this.emit('click', json);

      res.send(prefetchView(json));
    } catch (err) {
      throw new Error(
        `Something went wrong with chat buttons! URL: ${req.originalUrl}`,
      );
    }
  };
}
