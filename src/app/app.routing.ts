import { Routes, RouterModule } from '@angular/router';

import { ColorListComponent } from './features/colors/color-list/color-list.component';
import { AddEditColorComponent } from './features/colors/add-edit-color/add-edit-color.component';
import { AuthGuard } from './features/guards/auth.guard';

const appRoutes: Routes = [
  { path: 'colorlist', component: ColorListComponent },
  {
    path: 'addeditcolor',
    component: AddEditColorComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/colorlist', pathMatch: 'full' },
];

export const RoutingModule = RouterModule.forRoot(appRoutes);
