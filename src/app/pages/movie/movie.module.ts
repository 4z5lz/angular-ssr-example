import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieComponent } from './movie.component';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: MovieComponent,
  },
];

@NgModule({
  declarations: [MovieComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class MovieModule {}
