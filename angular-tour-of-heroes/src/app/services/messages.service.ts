import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private _messages: string[] = [];

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
