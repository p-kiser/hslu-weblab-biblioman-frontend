import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { v4 as uuidv4 } from "uuid";
import { BookService } from "../book.service";
import { Book } from "../book";

@Component({
  selector: "app-book-create",
  templateUrl: "./book-create.component.html",
  styleUrls: ["./book-create.component.css"]
})
export class BookCreateComponent implements OnInit {
  isbn: string;
  book: Book;

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit() {
    this.book = this.newBook();
  }

  findBook() {
    this.bookService
      .findBook(this.book.isbn)
      .subscribe(
        book => (
          (this.book.title = book.volumeInfo.title),
          (this.book.authors = book.volumeInfo.authors)
        )
      );
    console.log("findBook called: " + this.book.isbn);
  }

  saveBook() {
    console.log("Save button pressed");
    this.bookService.saveBook(this.book).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
    this.book = this.newBook();
    this.gotoList();
  }

  gotoList() {
    this.router.navigate(["/books"]);
  }

  newBook(): Book {
    let newID = uuidv4();
    return { _id: newID, key: newID, title: "", authors: [] };
  }
}
