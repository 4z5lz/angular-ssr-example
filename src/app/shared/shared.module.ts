import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { ShowsComponent } from './shows/shows.component';
import { PromoComponent } from './promo/promo.component';

import { SafePipe } from './pipes/safe.pipe';
import { StripHtmlPipe } from './pipes/strip-html.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HeaderComponent,
    SafePipe,
    StripHtmlPipe,
    TruncatePipe,
    ShowsComponent,
    PromoComponent,
  ],
  exports: [
    HeaderComponent,
    SafePipe,
    StripHtmlPipe,
    TruncatePipe,
    ShowsComponent,
    PromoComponent,
  ],
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
