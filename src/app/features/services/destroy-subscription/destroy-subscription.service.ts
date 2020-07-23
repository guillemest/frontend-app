import { Observable, Subject } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DestroySubscriptionService extends Observable<void>
  implements OnDestroy {
  private readonly life$ = new Subject<void>();
  constructor() {
    super((subscriber) => this.life$.subscribe(subscriber));
  }

  ngOnDestroy(): void {
    this.life$.next();
    this.life$.complete();
  }
}
