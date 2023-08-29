import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IHero } from 'src/app/entities/hero';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss'],
})
export class HeroFormComponent implements OnInit, OnChanges {
  public selectedHero: IHero;
  private _heroID!: number;
  @Input() public returnUrl!: string;

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this._heroID = +params['id'];
      this.returnUrl = params['returnUrl']
        ? params['returnUrl']
        : this.returnUrl;
    });
    this.heroService
      .getById(this._heroID)
      .subscribe((hero) => (this.selectedHero = hero));
  }

  public save(): void {
    if (this.selectedHero) {
      this.heroService
        .putHero(this.selectedHero)
        .subscribe(() => this.heroService.getById(this.selectedHero.id));
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['heroID'].currentValue != changes['heroID'].previousValue) {
      this.heroService
        .getById(this._heroID)
        .subscribe((hero) => (this.selectedHero = hero));
    }
  }

  constructor(
    private readonly heroService: HeroService,
    private readonly route: ActivatedRoute
  ) {}
}
