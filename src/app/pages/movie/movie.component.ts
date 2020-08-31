import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { ShowDetails } from 'src/app/models/show';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  private showId: number;

  showDetails: ShowDetails = null;

  constructor(private moviesService: MoviesService, private route: ActivatedRoute) {
    this.showId = parseInt(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.moviesService.getShowDetailsById(this.showId).subscribe((data) => {
      this.showDetails = data  
    });
  }

}
