import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IHero } from 'src/app/entities/hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent {
  @Input() public hero: IHero;
  @Output() public clickEvent = new EventEmitter();

  constructor(private readonly router: Router) {}

  public onClick() {
    this.router.navigate(['/heroes', this.hero.id]);
  }
}
