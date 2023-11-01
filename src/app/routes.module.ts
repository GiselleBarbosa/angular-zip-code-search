import { AddressListComponent } from './features/address-list/address-list.component';
import { HomeComponent } from './features/home/home-component/home.component';
import { Routes } from '@angular/router';

export const homeRoute: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];

export const addressListRoutes: Routes = [
  {
    path: '',
    component: AddressListComponent,
  },
];