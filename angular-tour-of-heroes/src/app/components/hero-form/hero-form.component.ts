import { Component, Input } from '@angular/core';
import { Hero } from 'src/app/entities/hero';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.sass']
})
export class HeroFormComponent {
  @Input() public selectedHero! : Hero;
}
