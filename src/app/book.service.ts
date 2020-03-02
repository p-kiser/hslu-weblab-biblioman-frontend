import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Book } from "./book";
import { BOOKS } from "./mock-books";
import { MessageService } from "./message.service";
import { BookRepository } from "./bookRepository";

@Injectable({
  providedIn: "root"
})
export class BookService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  private booksUrl = "http://localhost:8080/book"; // URL to web api

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`BookService: ${message}`);
  }

  getBooks(): Observable<Book[]> {
    // TODO: send the message _after_ fetching the books

    this.log("fetched books");

    let response = this.http.get<Book[]>(this.booksUrl);
    return of(BOOKS);
  }

  getBookRepositpory() {
    this.log("fetched book repository");

    return this.http.get<any>(this.booksUrl);
  }

  getBook(id: string): Observable<Book> {
    // TODO: send the message _after_ fetching the book
    this.log(`fetched MOCK book id="${id}"`);

    return of(BOOKS.find(book => book.id === id));
  }
}
