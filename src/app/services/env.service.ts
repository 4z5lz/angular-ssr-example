import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  window: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.window = this.isBrowser() ? window : null;
  }

  public isDev(): boolean {
    return !environment.production;
  }

  public isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  public isServer(): boolean {
    return isPlatformServer(this.platformId);
  }
}