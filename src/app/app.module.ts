import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { BookListComponent } from './book-list/book-list.component';
import { ViewBookComponent } from './book-list/view-book/view-book.component';
import { CreateBookComponent } from './book-list/create-book/create-book.component';

import { AuthGuardService } from './service/auth-guard.service';
import { AuthService } from './service/auth.service';
import { BookService } from './service/book.service';
import { HeaderComponent } from './header/header.component';
@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    BookListComponent,
    ViewBookComponent,
    CreateBookComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthGuardService, AuthService, BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
