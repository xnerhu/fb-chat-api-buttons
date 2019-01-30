import { IButton } from '../interfaces';

const generateHash = (
  length: number,
  possible: string = 'abcdefghijklmnopqrstuvwxyz0123456789',
) => {
  let id = '';
  for (let i = 0; i < length; i++) {
    id += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return id;
};

export const getUrl = (endpoint: string, btn: IButton, threadId: string) => {
  const hash = generateHash(24);
  const data = encodeURIComponent(JSON.stringify(btn));
  return `${endpoint}?data=${data}&hash=${hash}`;
};
