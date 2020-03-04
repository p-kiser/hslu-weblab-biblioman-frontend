import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { Router } from "@angular/router";

import { Book } from "../book";
import { BookService } from "../book.service";

@Component({
  selector: "app-book-detail",
  templateUrl: "./book-detail.component.html",
  styleUrls: ["./book-detail.component.css"]
})
export class BookDetailComponent implements OnInit {
  book: Book;
  authors: string;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    this.getBook();
  }

  getBook(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.bookService
      .getBook(id)
      .subscribe(
        book => ((this.book = book), (this.authors = book.authors.join()))
      );
  }

  updateBook() {
    this.book.authors = this.authors.split(",");
    this.bookService.updateBook(this.book).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
    this.gotoList();
  }

  gotoList() {
    this.router.navigate(["/books"]);
  }

  goBack(): void {
    this.location.back();
  }
}
