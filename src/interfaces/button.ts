export interface IButton {
  id?: string;
  metadata?: any;
  title: string;
  description?: string;
  image?: string;
  onClick?: IButtonCallback;
}

export type IButtonCallback = (btn: IButton, threadId: string) => void;
