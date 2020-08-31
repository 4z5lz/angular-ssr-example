import { NgModule, PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import {
  BrowserModule,
  BrowserTransferStateModule,
} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

import { AppComponent } from './app.component';
import { HomeModule } from './pages/home/home.module';
import { MovieModule } from './pages/movie/movie.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserModule.withServerTransition({ appId: 'ssr-demo-data' }),
    BrowserTransferStateModule,
    HomeModule,
    MovieModule,
  ],
  declarations: [AppComponent],
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
