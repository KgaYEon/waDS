export interface Game {
  id: string;
  title: string;
  category?: string;
  imageUrl: string;
  imageAlt?: string;
  onClick?: () => void;
}
