import { Component, OnInit, Optional, Inject } from '@angular/core';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Response } from 'express';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {

  private response: Response;

  constructor(@Optional() @Inject(RESPONSE) response: any) {
    this.response = response;
  }

  ngOnInit() {
    if (this.response) {
      // response will only be if we have express
      // this.response.statusCode = 404;
      this.response.status(404);
    }
  }

}
