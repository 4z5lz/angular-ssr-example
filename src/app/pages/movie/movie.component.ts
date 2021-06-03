import { Component, OnInit } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { EnvironmentService } from 'src/app/services/env.service';
import { ShowDetails } from '../../models/show';
import { MoviesService } from '../../services/data.service';
import {
  HtmlModifyService,
  LinkRelAttr
} from '../../services/html-modify.service';
import { StripHtmlPipe } from '../../shared/pipes/strip-html.pipe';
import { TruncatePipe } from '../../shared/pipes/truncate.pipe';

const STATE_KEY_SHOWS = makeStateKey('movie-data');

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  showId: number;
  showName: string;

  showDetails: ShowDetails = null;

  constructor(
    private state: TransferState,
    private envSerivce: EnvironmentService,
    private moviesService: MoviesService,
    private htmlModify: HtmlModifyService,
    private route: ActivatedRoute,
    private stripHtml: StripHtmlPipe,
    private truncate: TruncatePipe
  ) {
    // Get movie ID param from the route
    this.showId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.showName = this.route.snapshot.paramMap.get('name');
  }

  ngOnInit(): void {
    // 1. Try to retreive movie data from the state
    // We suppose that it already has been fulfilled in the server
    this.showDetails = this.state.get(STATE_KEY_SHOWS, <ShowDetails>{});

    // 2. In the client, during navigation from home page, state may contains data of other movie
    // So, let's clear the showDetails variable
    if (this.showDetails.id !== this.showId) {
      this.showDetails = null;
    }

    // 3. Data not found, it seems we are in the server
    if (!this.showDetails) {
      this.moviesService.getShowDetailsById(this.showId).subscribe((data) => {
        this.showDetails = data;

        // 4. Place users data to TransferState
        this.state.set(STATE_KEY_SHOWS, <ShowDetails>data);

        // For UX, SEO & Social Media: Add Title tag
        this.htmlModify.addPageTitle(data.name);

        // For SEO & Social Media: Add meta description tag
        this.htmlModify.addMetaTag(
          'description',
          this.truncate.transform(this.stripHtml.transform(data.summary), [
            150,
            '...',
          ])
        );

        // For SEO: Add <link rel='canonical' href> tag
        this.htmlModify.setLinkTag(LinkRelAttr.canonical, this.envSerivce.getBaseHref() + 'movie/' + this.showId + '/' + this.showName);
      });
    }
  }
}
