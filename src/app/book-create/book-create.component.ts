import { Component, OnInit } from "@angular/core";
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

  constructor(private bookService: BookService) {}

  ngOnInit() {
    //this.isbn = ""; //9785961410204
    this.book = { _id: uuidv4(), title: "", authors: [] };
  }

  findBook() {
    this.bookService
      .findBook(this.isbn)
      .subscribe(
        book => (
          (this.book.title = book.volumeInfo.title),
          (this.book.authors = book.volumeInfo.authors)
        )
      );
    console.log("findBook called: " + this.isbn);
  }

  saveBook() {
    console.log("Save button pressed");
    this.bookService.saveBook(this.book);
  }
}

/*
function getBookDetails(isbn) {

  // Query the book database by ISBN code.
  isbn = isbn || "9781451648546"; // Steve Jobs book

  var url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn;

  var response = UrlFetchApp.fetch(url);
  var results = JSON.parse(response);

  if (results.totalItems) {

    // There'll be only 1 book per ISBN
    var book = results.items[0];

    var title = (book["volumeInfo"]["title"]);
    var subtitle = (book["volumeInfo"]["subtitle"]);
    var authors = (book["volumeInfo"]["authors"]);
    var printType = (book["volumeInfo"]["printType"]);
    var pageCount = (book["volumeInfo"]["pageCount"]);
    var publisher = (book["volumeInfo"]["publisher"]);
    var publishedDate = (book["volumeInfo"]["publishedDate"]);
    var webReaderLink = (book["accessInfo"]["webReaderLink"]);

    // For debugging
    Logger.log(book);

  }

}

*/