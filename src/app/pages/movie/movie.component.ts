import { Component, OnInit, PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { makeStateKey, TransferState } from '@angular/platform-browser';

import { ShowDetails } from '../../models/show';
import { MoviesService } from '../../services/data.service';
import {
  HtmlModifyService,
  LinkRelAttr,
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
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(APP_ID) private appId: string,
    private state: TransferState,
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
    // Try to retreive movie data from the state
    // We suppose that it already has been fulfilled in the SSR mode
    this.showDetails = this.state.get(STATE_KEY_SHOWS, <ShowDetails>{});

    // 2. In CSR mode, during navigation from home page, state may contains data of other movie
    // So, let's clear the showDetails variable
    if (this.showDetails.id !== this.showId) {
      this.showDetails = null;
    }

    if (!this.showDetails) {
      this.moviesService.getShowDetailsById(this.showId).subscribe((data) => {
        this.showDetails = data;

        // 3. Place users data to TransferState
        this.state.set(STATE_KEY_SHOWS, <ShowDetails>data);

        // Add Title tag
        this.htmlModify.addPageTitle(data.name);

        // Add meta description tag
        this.htmlModify.addMetaTag(
          'description',
          this.truncate.transform(this.stripHtml.transform(data.summary), [
            150,
            '...',
          ])
        );

        // Add <link rel='canonical' href> tag
        this.htmlModify.setLinkTag(LinkRelAttr.canonical, '/movie/' + this.showId + '/' + this.showName);
      });
    }
  }
}
