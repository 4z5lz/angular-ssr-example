import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './components/app.component';
import { HeaderComponent } from './components/header/header.component';
import { SafePipe } from './pipes/safe.pipe';
import { StripHtmlPipe } from './pipes/strip-html.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { ShowsComponent } from './components/shows/shows.component';
import { PromoComponent } from './components/promo/promo.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [AppComponent, HeaderComponent, SafePipe, StripHtmlPipe, TruncatePipe, ShowsComponent, PromoComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
