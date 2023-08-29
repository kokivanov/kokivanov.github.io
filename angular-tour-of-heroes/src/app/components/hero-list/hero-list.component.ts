import { Component, Input, OnInit } from '@angular/core';
import { IHero } from 'src/app/entities/hero';
import { HeroService } from 'src/app/services/hero.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss'],
})
export class HeroListComponent implements OnInit {
  public heroes: IHero[];
  public selectedHero?: IHero;
  @Input() public returnUrl!: string;

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  ngOnInit(): void {
    this.heroService.get().subscribe((heroes) => (this.heroes = heroes));
  }

  constructor(
    private readonly heroService: HeroService,
    private readonly messagesService: MessagesService
  ) {}

  public add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.postHero({ name } as IHero).subscribe((hero) => {
      this.heroes.push(hero);
    });
  }

  public onHeroClick(hero?: IHero) {
    this.selectedHero = hero;
    this.messagesService.add('Selecting ' + hero?.name + ' hero');
  }
}
