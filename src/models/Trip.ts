import { type } from "os";
import User from "./User";

export default class Trip {
  author: User;
  details: string;
  constructor(author: User, details: string) {
    this.author = author;
    this.details = details;
  }
}
