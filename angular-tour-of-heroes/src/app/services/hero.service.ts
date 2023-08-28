import { Injectable } from '@angular/core';
import { HEROES } from '../mock-data';
import { of } from 'rxjs';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  public get() {
    const heroes = of(HEROES)
    this.messagesService.add("Fetching heroes")
    return heroes
  }
  constructor(private messagesService : MessagesService) { }
}
