import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { BookListComponent } from './book-list/book-list.component';
import { ViewBookComponent } from './book-list/view-book/view-book.component';
import { CreateBookComponent } from './book-list/create-book/create-book.component';

import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [{path:"auth/signin", component:SigninComponent},
{path:"auth/signup", component:SignupComponent},
{path:"books", canActivate:[AuthGuardService], component: BookListComponent},
{path:"books/view/:id", canActivate:[AuthGuardService], component:ViewBookComponent},
{path:"books/create", canActivate:[AuthGuardService], component: CreateBookComponent},
{path:"", redirectTo:"books", pathMatch:"full"},
{path:"**", redirectTo:"books"}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
