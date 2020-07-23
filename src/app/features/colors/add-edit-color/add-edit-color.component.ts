import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Custom imports
import { ColorModel } from './../../models/color.model';
import { AppState } from '../../store';
import { selColor, loadColorList, editColor } from '../../store/color';
import { DestroySubscriptionService } from '../../services/destroy-subscription/destroy-subscription.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { LoadingService } from './../../services/loading/loading.service';
import { ColorsService } from './../../services/colors/colors.service';

@Component({
  selector: 'app-add-edit-color',
  templateUrl: './add-edit-color.component.html',
  styleUrls: ['./add-edit-color.component.scss'],
})
export class AddEditColorComponent implements OnInit {
  inputColor = '#fffff';
  color: ColorModel;
  colorId: number;
  form: FormGroup;
  action: string;
  request = {} as ColorModel;
  constructor(
    private store: Store<AppState>,
    private destroy$: DestroySubscriptionService,
    private formBuilder: FormBuilder,
    private colorsService: ColorsService,
    private loadingService: LoadingService,
    private snackBar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.store
      .pipe(select(selColor), takeUntil(this.destroy$))
      .subscribe((color) => {
        this.color = color;
        this.action = this.color === null ? 'Nuevo' : 'Editar';
        if (this.color) {
          this.request = this.color;
          this.colorId = this.color._id;
          Object.keys(this.color).forEach((field) => {
            if (field !== 'id') {
              this.form.get(field).setValue(this.color[field]);
            }
          });
        }
      });
  }

  createForm() {
    this.form = this.formBuilder.group({
      Name: ['', [Validators.required]],
      Color: ['', [Validators.required]],
      Pantone: ['', [Validators.required]],
      Year: ['', [Validators.required]],
    });

    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((field) => {
      this.request = field;
    });
  }

  goBack() {
    this.store.dispatch(editColor(null));
    this.store.dispatch(loadColorList());
  }

  save() {
    this.loadingService.openSpinner();
    if (!this.color) {
      this.colorsService
        .nuevoColor(this.request)
        .then((res) => {
          this.loadingService.closeSpinner();
          this.snackBar.open(res['message']);
          this.goBack();
        })
        .catch((err) => {
          this.loadingService.closeSpinner();
          this.snackBar.open(err);
        });
    } else {
      this.request._id = this.colorId;
      this.colorsService
        .actualizarColores(this.request)
        .then((res) => {
          this.loadingService.closeSpinner();
          this.snackBar.open(res['message']);
          this.goBack();
        })
        .catch((err) => {
          this.loadingService.closeSpinner();
          this.snackBar.open(err);
        });
    }
  }

  setColor(evt) {
    evt.preventDefault();
    this.form.get('Color').setValue(evt.target.value);
  }
}
