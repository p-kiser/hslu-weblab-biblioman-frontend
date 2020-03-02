import { Component, OnInit } from "@angular/core";
import { Book } from "../book";

import { BookService } from "../book.service";
import { MessageService } from "../message.service";

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.css"]
})
export class BooksComponent implements OnInit {
  selectedBook: Book;
  books: Book[];

  constructor(
    private bookService: BookService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getBooks();
  }

  onSelect(book: Book) {
    this.selectedBook = book;
    this.messageService.add(`BookService: Selected book: "${book.title}"`);
  }

  getBooks(): void {
    this.bookService.getBooks().subscribe(books => (this.books = books));
  }
}
