import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from '../../model/Book.model';
import { BookService } from '../../service/book.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {

  bookForm: FormGroup;
  fileUploaded: boolean = false;
  fileInUpload: boolean = false;
  fileURL: string = '';

  constructor(private bookService: BookService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.bookForm = this.formBuilder.group({
      titre: ['', [Validators.required]],
      author: ['', [Validators.required]],
      synap: ''
    });

  }

  onCreateBook() {
    const titre = this.bookForm.get('titre').value;
    const author = this.bookForm.get('author').value;
    const synap = this.bookForm.get('synap').value;
    const book = new Book(titre, author);

    if (this.fileURL && this.fileURL !== '') {
      book.photo = this.fileURL;
    }

    book.synopsis = synap;
    this.bookService.createBook(book);
    this.router.navigate(["/books"]);
  }

  onUploadFile(file: File) {
    this.fileInUpload = true;
    this.bookService.uploadFile(file).then(
      (fileURL: string) => {
        this.fileURL = fileURL;
        this.fileInUpload = false;
        this.fileUploaded = true;
      },
      (error) => {
        this.fileInUpload = false;
        console.log(error);
      }
    ).catch(() => { this.fileInUpload = false });

  }

  onDetectFile(event) {
    this.onUploadFile(event.target.files[0]);
  }

}
