import { Component, OnInit } from '@angular/core';
import { CatsService } from './services/cats.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  imgSrc : string;

  constructor(private catsService : CatsService ) {
  }

  ngOnInit(): void {
    this.catsService.getCat().subscribe(data => {
      this.imgSrc = this.catsService.baseUrl + data.url
    })
  }

  updateImage() {
    this.catsService.getCat().subscribe(data => {
      this.imgSrc = this.catsService.baseUrl + data.url
    })
  }
}
