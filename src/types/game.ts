/**
 * Shared across screens (Home, SearchResults, ...). Was Home-only until
 * SearchResults needed the same shape too — promoted here per the "second
 * use" rule instead of screens importing from each other's folders.
 */
export interface Game {
  id: string;
  title: string;
  category?: string;
  imageUrl: string;
  imageAlt?: string;
  onClick?: () => void;
}
