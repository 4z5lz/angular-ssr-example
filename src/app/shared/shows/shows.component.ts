import { TransferState, makeStateKey } from '@angular/platform-browser';
import { Component, OnInit, PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { MoviesService } from 'src/app/services/data.service';
import { Show } from 'src/app/models/show';

const STATE_KEY_SHOWS = makeStateKey('shows-data');

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css'],
})
export class ShowsComponent implements OnInit {
  shows: Array<Show> = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(APP_ID) private appId: string,
    private state: TransferState,
    private moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    // Let's suppose that we're in the Client side
    // and TransferState contains the users data
    this.shows = this.state.get(STATE_KEY_SHOWS, <any>[]);

    if (!this.shows.length) {
      this.moviesService.getShows('scince fiction').subscribe((data) => {
        this.shows = data;

        // Place users data to TransferState
        this.state.set(STATE_KEY_SHOWS, <any>data);
      });
    }
  }
}
