import { Component } from '@angular/core';

import { DataService } from '../services/data.service';
import { User } from '../models/user';
import { Post } from '../models/post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  users: Array<User> = [];
  posts: Array<Post> = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getUsers().subscribe((data) => {
      this.users = data;
    });

    this.dataService.getPosts().subscribe((data) => {
      this.posts = data;
    });
  }
}
