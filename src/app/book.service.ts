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

  // TODO: $GOOGLE_API_KEY
  private API_KEY = "AIzaSyBStCHFb3v8Y8ruoO6VYfpcaR_qAazcE-A";

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`BookService: ${message}`);
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<GetResponse>(this.booksUrl).pipe(
      map(response => response._embedded.book),
      tap(books => this.log(`fetched books`)),
      catchError(this.handleError("GetBooks", []))
    );
  }

  getBook(id: string): Observable<Book> {
    this.log(`fetched book id="${id}"`);
    return this.http.get<Book>(`${this.booksUrl}/${id}`);
  }

  saveBook(book: Book): Observable<Object> {
    book.authors = book.authors
      .toString()
      .replace(", ", ",")
      .split(",");
    this.log(`creating new book: ${book.title}`);
    return this.http.post(`${this.booksUrl}`, book);
  }

  findBook(isbn: string): any {
    let url = `${this.isbnApi}${isbn}`; // ?key=${this.API_KEY}
    this.log(`Getting info for ${url}`);
    return this.http.get<any>(url).pipe(
      map(response => response.items[0]),
      tap(book => this.log(`Got info for ${isbn}`)),
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
