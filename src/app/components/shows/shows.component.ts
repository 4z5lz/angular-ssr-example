import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/data.service';
import { Show } from 'src/app/models/show';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})
export class ShowsComponent implements OnInit {

  shows: Array<Show> = [];
  
  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService.getShows('scince fiction').subscribe((data) => {
      this.shows = data;
    });
  }

}
