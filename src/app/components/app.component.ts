import { Component } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';

import { UserService } from '../services/user.service';
import { EnvironmentService } from '../services/env.service';
import { HtmlModifierService } from '../services/html-modifier.service';
import { User } from '../models/user';

const STATE_KEY_ITEMS = makeStateKey('users-data');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = "Users page";
  users: Array<User>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(APP_ID) private appId: string,
    private state: TransferState,
    private htmlModSerivce: HtmlModifierService,
    private envSerivce: EnvironmentService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    
    if (this.envSerivce.isDev() || this.envSerivce.isServer()) {
      this.htmlModSerivce.addPageTitle(this.title);
      this.htmlModSerivce.addMetaTag('description', this.title);
    }

    this.users = this.state.get(STATE_KEY_ITEMS, <any>[]);

    if (!this.users.length) {
      this.userService.getUsers().subscribe((data) => {
        this.users = data;
        this.state.set(STATE_KEY_ITEMS, <any>data);
      });
    }
  }
}
