import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  open(msg) {
    this.snackBar.open(msg, '', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 1500,
    });
  }
}
