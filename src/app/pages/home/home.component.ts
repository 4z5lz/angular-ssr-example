import { Component, OnInit } from '@angular/core';
import { EnvironmentService } from 'src/app/services/env.service';
import {
  HtmlModifyService,
  LinkRelAttr
} from 'src/app/services/html-modify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isBrowser: boolean = false;

  constructor(
    private envSerivce: EnvironmentService,
    private htmlModify: HtmlModifyService
  ) {
    // For UX, SEO & Social Media: Add Title tag
    this.htmlModify.addPageTitle('Science Fiction Movies Shop');

    // For SEO & Social Media: Add meta description tag
    this.htmlModify.addMetaTag(
      'description',
      'Welcome to Science Fiction Movies Shop'
    );

    // For SEO: Add <link rel='canonical' href> tag
    this.htmlModify.setLinkTag(LinkRelAttr.canonical, this.envSerivce.getBaseHref());
  }

  ngOnInit(): void {
    this.isBrowser = this.envSerivce.isBrowser();
  }
}
