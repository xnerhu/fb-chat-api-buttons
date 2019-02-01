export interface IButtonBase {
  id?: string;
  metadata?: any;
  onClick?: IButtonCallback;
}

export type IButtonCallback = (
  btn?: IButton | IRichButton,
  threadId?: string,
) => void;

export interface IButton extends IButtonBase {
  text: string;
  color?: string;
}

export interface IRichButton extends IButtonBase {
  title: string;
  description?: string;
  image?: string;
}
