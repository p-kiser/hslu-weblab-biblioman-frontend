import { Book } from "./book";
import { TestBed } from "@angular/core/testing";

export interface BookRepository {
  _embedded: {
    book: Book[];
    _links: any;
    page: {
      size: number;
      totalElements: number;
      totalPages: number;
      number: number;
    };
  };
}
