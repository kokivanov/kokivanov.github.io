import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _apiKey?: string;

  public get apiKey() {
    return this._apiKey;
  }

  public setApiKey(key: string) {
    console.log('Setting key');
    this._apiKey = key;
  }

  constructor(private readonly httpClient: HttpClient) {}
}
