import { Component } from '@angular/core';
import { HEROES } from './mock-data';
import { Hero } from './entities/hero';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public readonly title = 'angular-tour-of-heroes';
  public readonly heroes = HEROES;
  public selectedHero? : Hero;

  public onHeroClick(hero? : Hero) {
    this.selectedHero = hero;
  }
}
