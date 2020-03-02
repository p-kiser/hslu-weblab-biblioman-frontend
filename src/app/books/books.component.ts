import { Component, OnInit } from "@angular/core";
import { Book } from "../book";
import { BookRepository } from "../bookRepository";

import { BookService } from "../book.service";

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.css"]
})
export class BooksComponent implements OnInit {
  books: Book[];
  bookRepository: BookRepository;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.getBooks();
    this.getBookRepository();
  }

  getBooks(): void {
    this.bookService.getBooks().subscribe(books => (this.books = books));
  }

  getBookRepository(): void {
    this.bookService
      .getBookRepositpory()
      .subscribe(br => (this.bookRepository = br));
  }
}
