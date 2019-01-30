import Store from '../store';
import { IButton } from '../interfaces';
import { getPrefetchUrl } from './url';

export const send = (threadId: string, btn: IButton) => {
  const msg = {
    body: getPrefetchUrl(btn.id),
  };
  Store.api.sendMessage(msg, threadId);
};
