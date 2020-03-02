import { Book } from "./book";
import { v4 as uuidv4 } from "uuid";

export const BOOKS: Book[] = [
  {
    id: uuidv4(), //"69696969-1337-4242-0420-000000000001",
    title: "Ed Mastery",
    authors: ["Michael W. Lucas", "Jim Knopf"],
    publisher: " Tilted Windmill Press",
    year: 2018,
    edition: 1
  },
  {
    id: uuidv4(),
    title: "Bierwandern Schweiz",
    authors: ["Monika Saxer"]
  },
  {
    id: uuidv4(),
    title: "Grafische Gestaltung von Zahlenmaterial",
    authors: ["Hans Riedwyl"],
    publisher: "Paul Haupt",
    year: 1979,
    edition: 2,
    isbn: "3-258-02767-7"
  }
];
