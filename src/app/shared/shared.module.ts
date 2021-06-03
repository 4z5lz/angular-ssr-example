import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { ShowsComponent } from './shows/shows.component';
import { PromoComponent } from './promo/promo.component';

import { SafePipe } from './pipes/safe.pipe';
import { StripHtmlPipe } from './pipes/strip-html.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { RouterModule } from '@angular/router';
import { HttpsLinkPipe } from './pipes/https-link.pipe';


@NgModule({
  declarations: [
    HeaderComponent,
    SafePipe,
    StripHtmlPipe,
    TruncatePipe,
    ShowsComponent,
    PromoComponent,
    HttpsLinkPipe,
  ],
  exports: [
    HeaderComponent,
    SafePipe,
    StripHtmlPipe,
    TruncatePipe,
    HttpsLinkPipe,
    ShowsComponent,
    PromoComponent,
  ],
  providers: [
    SafePipe,
    StripHtmlPipe,
    TruncatePipe,
    HttpsLinkPipe
  ],
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
