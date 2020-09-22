import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'movie/:id',
    loadChildren: () =>
      import('./pages/movie/movie.module').then((m) => m.MovieModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/notfound/notfound.module').then((m) => m.NotfoundModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
