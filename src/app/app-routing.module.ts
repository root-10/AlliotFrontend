import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./components/unauth/login/login.module').then(m => m.LoginModule) },
  { path: 'home', loadChildren: () => import('./components/auth/home/home.module').then(m => m.HomeModule) },
  { path: 'loader', loadChildren: () => import('./components/shared/loader/loader.module').then(m => m.LoaderModule) },
  { path: 'modal', loadChildren: () => import('./components/shared/modal/modal.module').then(m => m.ModalModule) },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
