import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store';
import { DestroySubscriptionService } from '../destroy-subscription/destroy-subscription.service';
import { takeUntil } from 'rxjs/operators';
import { selPerfil } from '../../store/color';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(
    private store: Store<AppState>,
    private destroy$: DestroySubscriptionService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.store
      .pipe(select(selPerfil), takeUntil(this.destroy$))
      .subscribe((currentUser) => {
        if (currentUser) {
          request = request.clone({
            setHeaders: {
              Authorization: currentUser,
            },
          });
        }
      });

    return next.handle(request);
  }
}
