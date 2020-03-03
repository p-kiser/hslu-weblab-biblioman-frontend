import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { tap, map, catchError } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Book } from "./book";
import { MessageService } from "./message.service";
import { GetResponse } from "./getResponse";

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
    return this.http.get<GetResponse>(this.booksUrl).pipe(
      map(response => response._embedded.book),
      tap(books => this.log(`fetched books`)),
      catchError(this.handleError("getHeroes", []))
    );
  }

  getBookRepository() {
    this.log("fetched book repository");

    return this.http.get<GetResponse>(this.booksUrl);
  }

  getBook(id: string): Observable<Book> {
    // TODO: send the message _after_ fetching the book
    this.log(`fetched book id="${id}"`);
    return this.http.get<Book>(`${this.booksUrl}/${id}`);
    //return of(BOOKS.find(book => book.id === id));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
