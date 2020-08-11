import { NgModule, PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import {
  BrowserModule,
  BrowserTransferStateModule,
} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

import { AppComponent } from './components/app.component';
import { HeaderComponent } from './components/header/header.component';
import { SafePipe } from './pipes/safe.pipe';
import { StripHtmlPipe } from './pipes/strip-html.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { ShowsComponent } from './components/shows/shows.component';
import { PromoComponent } from './components/promo/promo.component';

@NgModule({
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule.withServerTransition({ appId: 'ssr-demo-data' }),
    BrowserTransferStateModule,
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    SafePipe,
    StripHtmlPipe,
    TruncatePipe,
    ShowsComponent,
    PromoComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string
  ) {
    const platform = isPlatformBrowser(platformId)
      ? 'in the browser'
      : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }
}
