import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private _messages : string[] = []

  public get messages() {
    return this._messages
  } 
  
  public add(message : string) {
    this._messages.push(message)
    console.log(this._messages)
  }

  public clear() {
    this._messages = []
    console.log("Cleaned")
  }

  constructor() { 
    console.log("Created")
  }
}
