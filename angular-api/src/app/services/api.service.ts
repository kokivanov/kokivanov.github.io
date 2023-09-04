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
    private readonly _authService: AuthService,
    private readonly _httpClient: HttpClient
  ) {}

  private _stateSubject = new Subject<Date>();
  public get checkState() {
    return this._stateSubject.asObservable();
  }

  public addItem(body: { content: string }) {
    console.log('adding item with key ' + this._authService.apiKey);
    this._httpClient.post<IItem>(this._baseUrl + 'tasks', body).subscribe({
      next: () => {
        this._stateSubject.next(new Date());
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  public getItems(): Observable<[IItem[], IItem[]]> {
    this._httpClient
      .get<{ items: IItem[] }>(this._syncUrl + 'completed/get_all')
      .subscribe((v) => console.log(v));
    return zip(
      this._httpClient.get<IItem[]>(this._baseUrl + 'tasks'),
      this._httpClient
        .get<{ items: IItem[] }>(this._syncUrl + 'completed/get_all')
        .pipe(map((v) => v.items))
    );
  }
}
