import { Book } from "./book";

export interface GetResponse {
  _embedded: {
    book: Book[];
    _links: { self: { href: string } };
    page: {
      size: number;
      totalElements: number;
      totalPages: number;
      number: number;
    };
  };
}
