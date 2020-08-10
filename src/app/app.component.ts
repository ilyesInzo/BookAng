import { Component } from '@angular/core';
import * as firebase from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(){
    const config = {    
    apiKey: "AIzaSyBdV3hmr1EcPLnvMDPWWP89zyzo9jS4sv4",
    authDomain: "bookdb-cc978.firebaseapp.com",
    databaseURL: "https://bookdb-cc978.firebaseio.com",
    projectId: "bookdb-cc978",
    storageBucket: "bookdb-cc978.appspot.com",
    messagingSenderId: "179723219602",
    appId: "1:179723219602:web:72896dbec393703abd6c4b",
    measurementId: "G-0XQ4Q88C38"
  };
    firebase.initializeApp(config);
  }



}
