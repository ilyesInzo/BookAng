import { Injectable, resolveForwardRef } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {


    return new Promise((resolve, reject) => {


      firebase.auth().onAuthStateChanged(
        (user) => {

          if (user) {
            resolve(true);
          }
          else { resolve(false); 
          this.router.navigate(['/auth','signin']);
          }

        },
        (error) => { reject(error); }

      );


    });

  }
}
