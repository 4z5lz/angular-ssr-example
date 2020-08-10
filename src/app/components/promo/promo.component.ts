import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/data.service';
import { Show } from 'src/app/models/show';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.css']
})
export class PromoComponent implements OnInit {

  promo: Array<Show> = [];
  title: string = '';

  private promoQueries: Array<any> = [
    {
      title: 'The Stars Wars Promo',
      query: 'stars wars'
    },
    {
      title: 'The Marvel Universe Promo',
      query: 'marvel'
    },
    {
      title: 'Fantasy World Promo',
      query: 'fantasy'
    }
  ];  

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    let randomPromo = this.promoQueries[Math.floor(Math.random() * this.promoQueries.length)];
    
    this.title = randomPromo.title;
    
    this.moviesService.getShows(randomPromo.query).subscribe((data) => {
      this.promo = data;
    });
  }

}
