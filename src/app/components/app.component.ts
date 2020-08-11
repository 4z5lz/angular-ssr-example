import { Component } from '@angular/core';
import { EnvironmentService } from '../services/env.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isBrowser: boolean = false;

  constructor(private envSerivce: EnvironmentService) {}

  ngOnInit(): void {
    this.isBrowser = this.envSerivce.isBrowser()
  }
}
