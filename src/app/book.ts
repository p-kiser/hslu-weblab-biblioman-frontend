export interface Book {
  _id: string;
  title: string;
  authors: string[];
  publisher?: string;
  edition?: number;
  year?: number;
  series?: string;
  type?: string;
  isbn?: string;
  description?: string;
  rating?: number;
  wishlist?: boolean;
}
