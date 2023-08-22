import { Component, Input } from '@angular/core';
import { Hero } from 'src/app/entities/hero';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.sass']
})
export class HeroesComponent {
  @Input() hero!: Hero
  
}
