import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cronometros',
    pathMatch: 'full'
  },
  {
    path: 'cronometros',
    loadChildren: './cronometros/cronometros.module#CronometrosPageModule'
  },
  {
    path: 'about',
    loadChildren: './about/about.module#AboutPageModule'
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
