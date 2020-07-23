import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { newColor, loadColorList, editColor } from './color.actions';
import { Router } from '@angular/router';

@Injectable()
export class ColorEffects {
  constructor(private actions$: Actions, private router: Router) {}
  newColor$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(newColor, editColor),
        tap(() => this.router.navigate(['/addeditcolor']))
      ),
    { dispatch: false }
  );

  loadColorList$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadColorList),
        tap(() => this.router.navigate(['/colorlist']))
      ),
    { dispatch: false }
  );

}
