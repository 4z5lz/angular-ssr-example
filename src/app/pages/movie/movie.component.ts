import { Component, OnInit, PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { MoviesService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { ShowDetails } from 'src/app/models/show';
import { makeStateKey, TransferState } from '@angular/platform-browser';

const STATE_KEY_SHOWS = makeStateKey('movie-data');

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  private showId: number;

  showDetails: ShowDetails = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(APP_ID) private appId: string,
    private state: TransferState,
    private moviesService: MoviesService, 
    private route: ActivatedRoute
    ) {
    this.showId = parseInt(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.showDetails = this.state.get(STATE_KEY_SHOWS, <ShowDetails>{});

    if (!Object.keys(this.showDetails).length) {
      this.moviesService.getShowDetailsById(this.showId).subscribe((data) => {
        this.showDetails = data  

        // Place users data to TransferState
        this.state.set(STATE_KEY_SHOWS, <ShowDetails>data);
      });
    }
  }

}
