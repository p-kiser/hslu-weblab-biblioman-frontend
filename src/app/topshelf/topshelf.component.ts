import { Component, OnInit } from "@angular/core";

import { Book } from "../book";
import { BookService } from "../book.service";

@Component({
  selector: "app-topshelf",
  templateUrl: "./topshelf.component.html",
  styleUrls: ["./topshelf.component.css"]
})
export class TopshelfComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService
      .getBooks()
      .subscribe(books => (this.books = books.slice(0, 4)));
  }
}
