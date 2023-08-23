import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hero } from 'src/app/entities/hero';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent {
  @Input() public hero!: Hero;
  @Output() public clickEvent = new EventEmitter();
  
  public onClick(hero: Hero) {
    this.clickEvent.emit(hero)
  }
}
