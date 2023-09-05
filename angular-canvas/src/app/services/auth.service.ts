import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, tap } from 'rxjs';
import { IUser } from 'src/app/entities/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _baseUrl = 'https://dummyjson.com/';
  private _user: IUser | null = null;

  constructor(private readonly _httpClient: HttpClient) {}

  public get isAuthorized() {
    return !!this._user || false;
  }

  public get token() {
    return this._user?.token;
  }

  private _loginRequest(username: string, password: string) {
    return this._httpClient
      .post<IUser>(this._baseUrl + 'auth/login', { username, password })
      .pipe(
        tap((v) => {
          this._user = v;
          localStorage.setItem('UserData', JSON.stringify(v));
        })
      );
  }

  public login(username: string, password: string) {
    let userData;
    if (this._user) {
      return this._user;
    } else if ((userData = localStorage.getItem('UserData'))) {
      return of<IUser>((this._user = JSON.parse(userData)));
    } else {
      return this._loginRequest(username, password);
    }
  }

  public register() {
    throw new Error('Method not implemented.');
  }

  public logout() {
    this._user = null;
    localStorage.removeItem('UserData');
  }
}
