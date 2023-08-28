import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Hero } from '../entities/hero';
import { MessagesService } from './messages.service';


@Injectable({ providedIn: 'root' })
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messagesService: MessagesService) { }

  /** GET heroes from the server */
  get(): Observable<Hero[]> {
    this.messagesService.add("Fetching heroes")
    return this.http.get<Hero[]>(this.heroesUrl);
  }

  /** GET hero by id. Return `undefined` when id not found */
  getOr404<Data>(id: number): Observable<Hero[]> {
    this.messagesService.add("Fetching heroes")
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url);
  }

  getById(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url);
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`);
  }

  postHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions);
  }
  
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions);
  }

  putHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions);
  }

}