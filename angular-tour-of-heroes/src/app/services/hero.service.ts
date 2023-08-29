import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { IHero } from '../entities/hero';
import { MessagesService } from './messages.service';

@Injectable({ providedIn: 'root' })
export class HeroService {
  private heroesUrl = 'api/heroes'; // URL to web api

  private _httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messagesService: MessagesService
  ) {}

  /** GET heroes from the server */
  public get(): Observable<IHero[]> {
    this.messagesService.add('Fetching heroes');
    return this.http.get<IHero[]>(this.heroesUrl);
  }

  /** GET hero by id. Return `undefined` when id not found */
  public getOr404(id: number): Observable<IHero[]> {
    this.messagesService.add('Fetching heroes');
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<IHero[]>(url);
  }

  public getById(id: number): Observable<IHero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<IHero>(url);
  }

  public searchHeroes(term: string): Observable<IHero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<IHero[]>(`${this.heroesUrl}/?name=${term}`);
  }

  public postHero(hero: IHero): Observable<IHero> {
    return this.http.post<IHero>(this.heroesUrl, hero, this._httpOptions);
  }

  public deleteHero(id: number): Observable<IHero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<IHero>(url, this._httpOptions);
  }

  public putHero(hero: IHero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this._httpOptions);
  }
}
