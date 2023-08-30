import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private _messages: string[] = [];
  private _isActive: boolean = true;

  public get isActive() {
    return this._isActive;
  }

  public toggleActive() {
    this._isActive = !this._isActive;
  }

  public get messages() {
    return this._messages;
  }

  public add(message: string) {
    this._messages.push(message);
  }

  public clear() {
    this._messages = [];
  }

  constructor() {}
}
