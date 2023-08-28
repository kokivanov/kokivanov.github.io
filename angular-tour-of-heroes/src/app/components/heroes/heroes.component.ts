import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from 'src/app/entities/hero';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent {
  @Input() public hero!: Hero;
  @Output() public clickEvent = new EventEmitter();

  constructor(private readonly router : Router) {}

  public onClick(hero: Hero) {
  this.router.navigate(["/heroes", this.hero.id])
  }
}
