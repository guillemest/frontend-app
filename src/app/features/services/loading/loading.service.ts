import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { LoadingComponent } from '../../shared/loading/loading.component';

@Injectable()
export class LoadingService {
  constructor(private dialog: MatDialog) {}

  openSpinner(): MatDialogRef<LoadingComponent> {
    if (this.dialog.getDialogById('loading-spinner')) {
      return;
    } else {
      return this.dialog.open(LoadingComponent, {
        id: 'loading-spinner',
        disableClose: true,
        panelClass: 'progressSpinner'
      });
    }
  }

  closeSpinner() {
    this.dialog.closeAll();
  }
}
