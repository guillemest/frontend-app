import {
  takeUntil,
  debounceTime,
  map,
  distinctUntilChanged,
} from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

// Custom imports
import { AppState } from '../../store';
import {
  newColor,
  editColor,
  perfilConsulta,
  selPerfil,
  resetState,
} from '../../store/color';
import { ColorModel } from '../../models/color.model';
import { ColorsService } from '../../services/colors/colors.service';
import { LoadingService } from '../../services/loading/loading.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { AlertConfirmComponent } from '../../shared/alert-confirm/alert-confirm.component';
import {
  PaginatorRequestModel,
  PaginatorResponseModel,
} from '../../models/paginator.model';
import { DestroySubscriptionService } from '../../services/destroy-subscription/destroy-subscription.service';
import { SeleccionarPerfilComponent } from '../seleccionar-perfil/seleccionar-perfil.component';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.scss'],
})
export class ColorListComponent implements OnInit, OnDestroy {
  data = {} as PaginatorResponseModel;
  itemsPorPagina = new FormControl({ value: 6, disabled: false });
  mostrarBotonCrear = false;
  constructor(
    private colorservice: ColorsService,
    private loadingService: LoadingService,
    private store: Store<AppState>,
    private dialog: MatDialog,
    private snackBar: SnackbarService,
    private destroy$: DestroySubscriptionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store
      .pipe(select(selPerfil), takeUntil(this.destroy$))
      .subscribe((currentUser) => {
        if (!currentUser) {
          this.seleccionarPerfil();
        } else {
          this.obtenerColores();
          this.subscribeItemsPorPagina();
        }
      });
  }

  ngOnDestroy(): void {
    const rutaActual = this.router.url.split('/').pop();
    if (rutaActual !== 'addeditcolor') {
      this.store.dispatch(resetState());
    }
  }

  subscribeItemsPorPagina() {
    this.itemsPorPagina.valueChanges
      .pipe(
        debounceTime(600),
        map((v) => v),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((value) => {
        const options: PaginatorRequestModel = {
          limit: +value,
          page: 1,
        };

        this.obtenerColores(options);
      });
  }

  obtenerColores(options?: PaginatorRequestModel) {
    this.loadingService.openSpinner();
    this.colorservice.obtenerColores(options).then((res) => {
      this.loadingService.closeSpinner();
      this.data = res;
    });
  }

  newColor() {
    this.store.dispatch(newColor());
  }

  delete(data: ColorModel) {
    const height = `${(window.innerHeight * 20) / 100}px`;
    const width = `${(window.innerWidth * 40) / 100}px`;
    this.dialog
      .open(AlertConfirmComponent, {
        disableClose: true,
        data,
        height,
        width,
      })
      .afterClosed()
      .toPromise()
      .then((del) => {
        if (del === true) {
          this.loadingService.openSpinner();
          this.colorservice
            .eliminarColor(data._id)
            .toPromise()
            .then((resp) => {
              this.loadingService.closeSpinner();
              this.snackBar.open(resp.message);
              this.obtenerColores();
            })
            .catch((err) => {
              this.snackBar.open(err);
            });
        }
      });
  }

  edit(data: ColorModel) {
    this.store.dispatch(editColor({ color: data }));
  }

  pagAnt() {
    const options: PaginatorRequestModel = {
      limit: +this.itemsPorPagina.value,
      page: this.data.currentPage - 1 || 1,
    };
    this.obtenerColores(options);
  }

  pagSig() {
    const options: PaginatorRequestModel = {
      limit: +this.itemsPorPagina.value,
      page: (this.data.currentPage || 1) + 1,
    };
    this.obtenerColores(options);
  }

  seleccionarPerfil() {
    const height = `${(window.innerHeight * 25) / 100}px`;
    const width = `${(window.innerWidth * 40) / 100}px`;
    this.dialog
      .open(SeleccionarPerfilComponent, {
        disableClose: true,
        height,
        width,
      })
      .afterClosed()
      .toPromise()
      .then((perfil) => {
        if (perfil) {
          this.mostrarBotonCrear = perfil === 'admin' ? true : false;
          this.store.dispatch(perfilConsulta(perfil));
          this.obtenerColores();
          this.subscribeItemsPorPagina();
        }
      });
  }
}
