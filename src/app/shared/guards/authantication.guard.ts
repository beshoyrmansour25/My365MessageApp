import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Route, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthanticationGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private router: Router) {

  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.isLoggedin();
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.canActivate(childRoute, state);
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true; // this.isLoggedin();
  }
  isLoggedin() {
    if (localStorage.getItem('username')) { return true; } else {

      this.router.navigate(['']);
      return false;
    }
  }
}
