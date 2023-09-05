import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, zip } from 'rxjs';
import { IItem } from '../entities/item';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly _baseUrl = 'https://api.todoist.com/rest/v2/';
  private readonly _syncUrl = 'https://api.todoist.com/sync/v9/';
  constructor(private readonly _httpClient: HttpClient) {}

  private _stateSubject = new Subject<null>();
  public get checkState() {
    return this._stateSubject.asObservable();
  }

  public addItem(body: { content: string }) {
    const itemSubscription = this._httpClient
      .post<IItem>(this._baseUrl + 'tasks', body)
      .subscribe({
        next: () => {
          this._stateSubject.next(null);
          itemSubscription.unsubscribe();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  public getItems(): Observable<IItem[]> {
    return zip(
      this._httpClient.get<IItem[]>(this._baseUrl + 'tasks'),
      this._httpClient
        .get<{ items: IItem[] }>(this._syncUrl + 'completed/get_all')
        .pipe(map((v) => v.items))
    ).pipe(map((items) => new Array<IItem>().concat(...items)));
  }
}
