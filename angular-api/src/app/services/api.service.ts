import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, zip } from 'rxjs';
import { IItem } from '../entities/item';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly _baseUrl = 'https://api.todoist.com/rest/v2/';
  private readonly _syncUrl = 'https://api.todoist.com/sync/v9/';
  constructor(
    private readonly authService: AuthService,
    private readonly httpClient: HttpClient
  ) {}

  private _stateSubject = new Subject<Date>();
  public checkState(func: (v: Date) => void) {
    return this._stateSubject.subscribe({
      next: func,
    });
  }

  public addItem(body: { content: string }) {
    console.log('adding item with key ' + this.authService.apiKey);
    this.httpClient
      .post<IItem>(this._baseUrl + 'tasks', body, {
        headers: {
          Authorization: 'Bearer ' + this.authService.apiKey,
          'Content-Type': 'application/json',
        },
      })
      .subscribe({
        next: () => {
          this._stateSubject.next(new Date());
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  public getItems(): Observable<[IItem[], IItem[]]> {
    this.httpClient
      .get<{ items: IItem[] }>(this._syncUrl + 'completed/get_all', {
        headers: {
          Authorization: 'Bearer ' + this.authService.apiKey,
        },
      })
      .subscribe((v) => console.log(v));
    return zip(
      this.httpClient.get<IItem[]>(this._baseUrl + 'tasks', {
        headers: {
          Authorization: 'Bearer ' + this.authService.apiKey,
        },
      }),
      this.httpClient
        .get<{ items: IItem[] }>(this._syncUrl + 'completed/get_all', {
          headers: {
            Authorization: 'Bearer ' + this.authService.apiKey,
          },
        })
        .pipe(map((v) => v.items))
    );
  }
}
