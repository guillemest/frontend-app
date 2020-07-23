import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Models
import { ColorModel } from '../../models/color.model';

@Component({
  templateUrl: './alert-confirm.component.html',
  styleUrls: ['./alert-confirm.component.scss'],
})
export class AlertConfirmComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<AlertConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ColorModel
  ) {}

  ngOnInit(): void {}

  close(): void {
    this.dialogRef.close();
  }
}
