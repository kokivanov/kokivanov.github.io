import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from 'src/app/entities/hero';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.sass']
})
export class HeroFormComponent implements OnInit, OnChanges {
  public selectedHero! : Hero;
  private heroID! : number;
  @Input() public returnUrl! : string;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.heroID = +params['id']
      this.returnUrl = params['returnUrl'] ? params['returnUrl'] : this.returnUrl
    })
    this.heroService.getById(this.heroID).subscribe(hero => this.selectedHero = hero)
  }

  
  save(): void {
    console.log(this.selectedHero.name)
    if (this.selectedHero) {
      this.heroService.putHero(this.selectedHero).subscribe(() => 
        this.heroService.getById(this.selectedHero.id).subscribe((data) => console.log(data)));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['heroID'].currentValue != changes['heroID'].previousValue) {
      this.heroService.getById(this.heroID).subscribe(hero => this.selectedHero = hero)
    }
  }

  constructor (private readonly heroService: HeroService,
    private readonly route: ActivatedRoute) {}
}
