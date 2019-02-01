import { NextFunction, Request, Response } from 'express';

import { IOptions, IButton, IRichButton, IButtonCallback } from '../interfaces';
import { generateUrl } from '../utils';
import { prefetchView, clickView } from '../views';
import { generateHash } from 'src/utils/hash';

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

  public send(btn: IButton | IRichButton, threadId: string) {
    btn.id = btn.id || generateHash(8);

    const { endpoint, api } = this.options;
    const url = generateUrl(endpoint, btn, threadId);

    this.attachCallback(btn);
    api.sendMessage({ url }, threadId);
  }

  private attachCallback(btn: IButton | IRichButton) {
    const { id } = btn;
    if (this.callbacks[id] == null) {
      this.callbacks[id] = btn.onClick;
    }
  }

  private middleware = (req: Request, res: Response, next: NextFunction) => {
    try {
      const beingPrefetched = req.headers['user-agent'].includes('facebook');
      const { data, threadId } = req.query;
      const decoded = decodeURIComponent(data);

      const btn: IButton | IRichButton = JSON.parse(decoded);
      const isRichBtn = (btn as IRichButton).description != null;

      if (beingPrefetched && isRichBtn) {
        res.send(prefetchView(btn as IRichButton));
      } else {
        this.callbacks[btn.id](btn, threadId);
        res.send(clickView(threadId));
      }
    } catch (err) {
      throw new Error(
        `Something went wrong with chat buttons! URL: ${req.originalUrl}`,
      );
    }
    next();
  };
}
