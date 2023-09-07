import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authorizedGuard } from './guards/authorized.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/main-page/main-page.module').then(
        (m) => m.MainPageModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [(a: any, b: any) => !authorizedGuard(a, b)],
  },
  {
    path: 'canvas',
    canActivate: [authorizedGuard],
    loadChildren: () =>
      import('./modules/canvas/canvas.module').then((m) => m.CanvasModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
