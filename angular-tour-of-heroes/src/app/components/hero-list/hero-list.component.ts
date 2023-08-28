import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/entities/hero';
import { HeroService } from 'src/app/services/hero.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit{
  public heroes! : Hero[];
  public selectedHero? : Hero;

  ngOnInit(): void {
    this.heroService.get().subscribe(heroes => this.heroes = heroes)
  }

  constructor(
    private readonly heroService : HeroService,
    private readonly messagesService: MessagesService) {}

  public onHeroClick(hero? : Hero) {
    this.selectedHero = hero;
    this.messagesService.add("Selecting " + hero?.name + " hero")
  }
}