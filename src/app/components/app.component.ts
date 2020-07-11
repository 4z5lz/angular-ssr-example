import { Component } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';

import { User } from '../models/user';
import { Post } from '../models/post';
import { DataService } from '../services/data.service';
import { EnvironmentService } from '../services/env.service';

const STATE_KEY_USERS = makeStateKey('users-data');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  users: Array<User> = [];
  posts: Array<Post> = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(APP_ID) private appId: string,
    private state: TransferState,
    private dataService: DataService,
    private envSerivce: EnvironmentService
  ) {}

  ngOnInit(): void {

    // Let's suppose that we're in the Client side 
    // and TransferState contains the users data  
    this.users = this.state.get(STATE_KEY_USERS, <any>[]);
    
    if (!this.users.length) {
      // Users data not fount in the TransferState
      // So, we're in the Server Side now!
      this.dataService.getUsers().subscribe((data) => {
        this.users = data;

        // Place users data to TransferState
        this.state.set(STATE_KEY_USERS, <any>data);
      });
    }
        
    if (this.envSerivce.isBrowser()) {
      // Get posts list in the Client side only 
      this.dataService.getPosts().subscribe((data) => {
        this.posts = data;        
      });
    }
  }
}
