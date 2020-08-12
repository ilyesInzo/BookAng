import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Book } from '../model/Book.model';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  bookSubject = new Subject<Book[]>();
  books: Book[] = [];

  constructor() { }

  notifyBookChange() {

    this.bookSubject.next(this.books);

  }

  getBooks() {

    firebase.database().ref('/books').on("value", (dataSnap: firebase.database.DataSnapshot) => {
      this.books = dataSnap.val() ? dataSnap.val() : [];
      this.notifyBookChange();
    });

  }

  getSingleBook(id: number) {

    return new Promise((resolve, reject) => {
      firebase.database().ref('/books/' + id).once('value').then(
        (dataSnap: firebase.database.DataSnapshot) => {
          resolve(dataSnap.val());
        },
        (error) => { reject(error); }
      )
    });

  }

  saveBook() {
    firebase.database().ref('/books').set(this.books);
  }

  createBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBook();
    this.notifyBookChange();
  }

  deleteBook(book: Book) {

    if (book.photo) {

      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        () => { console.log("Deleted Photo !!!"); },
        (error) => { console.log("Deleted Photo !!!",error); }
      )
    }


    const bookIndex = this.books.findIndex((bookInstance) => {
      if (bookInstance = book) return true;
    });
    this.books.splice(bookIndex, 1);
    this.saveBook();
    this.notifyBookChange();
  }

  uploadFile(file: File) {

    return new Promise((resolve, reject) => {

      const uniqueUUID = Date.now().toString();

      const upload = firebase.storage().ref().child("images/" + uniqueUUID + file.name).put(file);

      upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
        () => { console.log("chargement"); },
        (error) => { reject(error); },
        () => {
          resolve(upload.snapshot.ref.getDownloadURL());
        });
    });



  }

}
