import Store from '../store';
import { IButton } from '../interfaces';
import { getUrl } from './url';

export const send = (btn: IButton, threadId: string) => {
  const url = getUrl(btn, threadId);
  Store.api.sendMessage({ body: url }, threadId);
};
