export interface IButton {
  id: string;
  title: string;
  description?: string;
  image?: string;
  onClick?: () => void;
}
