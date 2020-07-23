import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ColorPickerModule } from 'ngx-color-picker';
import 'hammerjs';

// Components
import { AppComponent } from './app.component';
import { AppFeaturesComponents, AppFeaturesEntryComp } from './features/index';

// Guards
import { AppGuards } from './features/guards';

// Directives
import { AppDirectives } from './features/directives';

// Routing
import { RoutingModule } from './app.routing';

// Modules
import { AngularMaterialModule } from './angular-material.module';

// Services
import { AppServices } from './features/services';

// NgRx
import { ColorEffects } from './features/store/color/color.effects';
import { reducers } from './features/store';
import { InterceptorService } from './features/services/interceptor/interceptor.service';

@NgModule({
  declarations: [AppComponent, AppFeaturesComponents, AppDirectives],
  imports: [
    RoutingModule,
    AngularMaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([ColorEffects]),
    StoreDevtoolsModule.instrument({
      name: 'Frontend-app',
      maxAge: 10,
    }),
    ColorPickerModule,
  ],
  providers: [
    AppServices,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    AppGuards,
  ],
  bootstrap: [AppComponent],
  entryComponents: [AppFeaturesEntryComp],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
