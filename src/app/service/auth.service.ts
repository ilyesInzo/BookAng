import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  signInUser(login: string, password: string) {

    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(login, password).then(
          () => { resolve(); },
          (error) => { reject(error); }
        );
      }
    );
  }

  sighUpUser(login: string, password: string) {

    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(login, password).then(
          () => { resolve(); },
          (error) => { reject(error); }
        );
      }
    );
  }

  signOutUser() {
    firebase.auth().signOut();
  }

}
