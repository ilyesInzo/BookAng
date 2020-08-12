import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from '../service/book.service';
import { Book } from '../model/Book.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {

  books: Book[];
  bookSubscription: Subscription;

  constructor(private bookService:BookService, private router:Router) {
    this.bookService.getBooks();
  }

  ngOnInit(): void {

    this.bookSubscription = this.bookService.bookSubject.subscribe(
      (books) => {
        this.books = books; 
      },
      (error) => {
         console.log(error); 
        }
    );
    this.bookService.notifyBookChange();

  }

  ngOnDestroy(): void {
    this.bookSubscription.unsubscribe();
  }

  onViewBook(index: number) {
    this.router.navigate(['/books','view', index]);
  }

  onDeleteBook(book: Book) {
    this.bookService.deleteBook(book);
  }

  onCreateBook(){
    this.router.navigate(['/books','create'])
  }

}
