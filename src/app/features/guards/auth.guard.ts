import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store';
import { selPerfil } from '../store/color';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  auth = false;
  constructor(private router: Router, private store: Store<AppState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.pipe(select(selPerfil)).subscribe((currentUser) => {
      if (currentUser === 'admin') {
        this.auth = true;
      } else {
        this.router.navigate(['/colorlist']);
        this.auth = false;
      }
    });

    return this.auth;
  }
}
