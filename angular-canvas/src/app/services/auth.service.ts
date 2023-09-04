import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { IUser } from 'src/entities/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _baseUrl = 'https://dummyjson.com/';
  private _user!: IUser;

  constructor(private readonly _httpClient: HttpClient) {}

  public get isAuthorized() {
    return this._user ? true : false;
  }

  public get token() {
    return this._user.token;
  }

  public login(username: string, password: string) {
    return this._httpClient
      .post<IUser>(this._baseUrl + 'auth/login', { username, password })
      .pipe(
        tap((v) => {
          console.log(v);
          this._user = v;
        })
      );
  }

  public register() {
    throw new Error('Method not implemented.');
  }

  public logout() {
    throw new Error('Method not implemented.');
  }
}
