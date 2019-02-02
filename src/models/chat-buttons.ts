import { NextFunction, Request, Response } from 'express';

import { IOptions, IButton, IButtonCallback } from '../interfaces';
import { generateUrl } from '../utils';
import { prefetchView, clickView } from '../views';
import { generateHash } from '../utils/hash';

interface ICallbacks {
  [key: string]: IButtonCallback;
}

export class ChatButtons {
  private callbacks: ICallbacks = {};

  constructor(public options: IOptions) {
    options.app.use(options.path, this.middleware);
  }

  public setApi(api: any) {
    this.options.api = api;
  }

  public send(btn: IButton, threadId: string) {
    btn.id = btn.id || generateHash(8);

    const { endpoint, api } = this.options;
    const url = generateUrl(endpoint, btn, threadId);

    this.attachCallback(btn);
    api.sendMessage({ url }, threadId);
  }

  private attachCallback(btn: IButton) {
    const { id } = btn;
    if (this.callbacks[id] == null) {
      this.callbacks[id] = btn.onClick;
    }
  }

  private middleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const beingPrefetched = req.headers['user-agent'].includes('facebook');
    const { data, threadId } = req.query;

    const decoded = decodeURIComponent(data);
    const btn = JSON.parse(decoded) as IButton;

    if (beingPrefetched) {
      res.send(prefetchView(btn));
    } else {
      this.callbacks[btn.id](threadId);
      res.send(clickView(threadId));
    }

    next();
  };
}
