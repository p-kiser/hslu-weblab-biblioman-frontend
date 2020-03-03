import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { BooksComponent } from "./books/books.component";
import { TopshelfComponent } from "./topshelf/topshelf.component";
import { BookDetailComponent } from "./book-detail/book-detail.component";
import { BookCreateComponent } from "./book-create/book-create.component";

const routes: Routes = [
  { path: "", redirectTo: "/books", pathMatch: "full" },
  { path: "topshelf", component: TopshelfComponent },
  { path: "books", component: BooksComponent },
  { path: "new", component: BookCreateComponent },
  { path: "detail/:id", component: BookDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
