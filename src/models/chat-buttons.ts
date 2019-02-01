import { NextFunction, Request, Response } from 'express';
import Jimp from 'jimp';

import { IOptions, IButton, IRichButton, IButtonCallback } from '../interfaces';
import { generateUrl } from '../utils';
import { prefetchView, clickView } from '../views';
import { generateHash } from '../utils/hash';

interface ICallbacks {
  [key: string]: IButtonCallback;
}

export class ChatButtons {
  private callbacks: ICallbacks = {};

  private font;

  constructor(public options: IOptions) {
    options.app.use(options.path, this.middleware);

    Jimp.loadFont(Jimp.FONT_SANS_16_BLACK, (err, font) => {
      this.font = font;
    });
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

  private middleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const beingPrefetched = req.headers['user-agent'].includes('facebook');
    const { data, threadId } = req.query;
    const decoded = decodeURIComponent(data);

    const btn: IButton | IRichButton = JSON.parse(decoded);
    const isRichBtn = (btn as IRichButton).description != null;

    if (isRichBtn) {
      const richBtn = btn as IRichButton;
      if (beingPrefetched) {
        res.send(prefetchView(richBtn));
      } else {
        this.callbacks[btn.id](richBtn, threadId);
        res.send(clickView(threadId));
      }
    } else {
      const simpleBtn = btn as IButton;
      if (beingPrefetched) {
        const buffer = await this.renderButton(simpleBtn.text, simpleBtn.color);
        res.set('Content-Type', Jimp.MIME_JPEG);
        res.send(buffer);
      } else {
        this.callbacks[btn.id](simpleBtn, threadId);
        res.send(clickView(threadId));
      }
    }

    next();
  };

  private async renderButton(text: string, background = '#03A9F4') {
    const fontWidth = Jimp.measureText(this.font, text);
    const fontHeight = Jimp.measureTextHeight(this.font, text, 256);

    const width = fontWidth + 48;
    const height = fontHeight + 48;

    const img = await new Jimp(width, height, background);

    await img.print(
      this.font,
      0,
      0,
      {
        text,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
      },
      width,
      height,
    );

    const buffer = await img.getBufferAsync(Jimp.MIME_JPEG);
    return buffer;
  }
}
