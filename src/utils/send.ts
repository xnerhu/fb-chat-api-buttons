import { IButton } from '../interfaces';
import { getUrl } from './url';

export const sendButton = (api: any, threadId: string, btn: IButton) => {
  const { id } = btn;
  const msg = {
    url: getUrl(id),
  };
  api.sendMessage(msg, id);
};
