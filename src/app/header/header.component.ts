import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;

  constructor(private authService : AuthService) { }

  ngOnInit(): void {

    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) { this.isAuth = true; }
        else this.isAuth = false;
      });
  }

  onSignOut(){

    this.authService.signOutUser();

  }

}
