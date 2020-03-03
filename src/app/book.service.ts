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

  private booksUrl = "http://localhost:8080/book"; //
  private isbnApi = "https://www.googleapis.com/books/v1/volumes?q=isbn:";

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

  getBook(id: string): Observable<Book> {
    this.log(`fetched book id="${id}"`);
    return this.http.get<Book>(`${this.booksUrl}/${id}`);
  }

  saveBook(book: Book): void {
    this.http.post(this.booksUrl, book);
    this.log(`book saved: ${book.title}`);
  }

  findBook(isbn: string): any {
    return this.http.get<any>(this.isbnApi + isbn).pipe(
      map(response => response.items[0]),
      tap(book => `Got info for ${isbn}`),
      catchError(this.handleError("findBook", {}))
    );
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
