import { NextFunction, Request, Response } from 'express';

import { IOptions, IButton, IButtonCallback } from '../interfaces';
import { generateHash, generateUrl, isBeingPrefetched } from '../utils';
import { prefetchView, clickView } from '../views';

interface ICallbacks {
  [key: string]: IButtonCallback;
}

export class ChatButtons {
  private callbacks: ICallbacks = {};

  /**
   * Inits chat buttons.
   * @param options
   */
  constructor(public options: IOptions) {
    this.options.path = this.options.path || '/callback';
    // Apply the middleware.
    options.app.use(options.path, this.middleware);
  }

  public setApi(api: any) {
    this.options.api = api;
  }

  /**
   * Sends a button.
   */
  public send(btn: IButton, threadId: string) {
    return new Promise((resolve: (info: any) => void) => {
      const { endpoint, api } = this.options;
      // If button hasn't got an id, then set a random one.
      btn.id = btn.id || generateHash(8);
      // Generate a callback url.
      const url = generateUrl(endpoint, btn, threadId);
      // Store button callback in memory.
      this.attachCallback(btn);
      // Send button.
      api.sendMessage({ url }, threadId, (err, info) => {
        resolve(info);
      });
    });
  }

  /**
   * Stores button callback in memory, so it can be triggered later.
   */
  private attachCallback(btn: IButton) {
    const { id } = btn;
    if (this.callbacks[id] == null) {
      this.callbacks[id] = btn.onClick;
    }
  }

  /**
   * A middleware for express server.
   */
  public middleware = (req: Request, res: Response, next: NextFunction) => {
    const { data, threadId } = req.query;
    const beingPrefetched = isBeingPrefetched(req);
    // Decode data and parse it to JSON
    const decoded = decodeURIComponent(data);
    const btn = JSON.parse(decoded) as IButton;
    // If link is being prefetched, then
    // render a html page with meta tags
    // e.g. <meta property="og:title" value="Button title" />
    if (beingPrefetched) {
      res.send(prefetchView(btn));
    }
    // If link isn't being prefetched, then it counts as a click, so
    // it will trigger callback and render a html page with js code that closes tab.
    else {
      res.send(clickView(threadId));
      const callback = this.callbacks[btn.id];
      if (callback != null) {
        callback(btn, threadId);
      }
    }
    next();
  };
}
