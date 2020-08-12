import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/service/book.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/model/Book.model';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.scss']
})
export class ViewBookComponent implements OnInit {

  book: Book;

  constructor(private bookService: BookService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const index = this.route.snapshot.params['id'];

    this.bookService.getSingleBook(+index).then(
      (value) => { console.log(value); },
      (error) => { }
    );

    this.book = this.bookService.books[index];
  }

  onBack() {
    this.router.navigate(['books']);
  }

}
