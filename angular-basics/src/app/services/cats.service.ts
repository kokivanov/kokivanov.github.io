import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { CatEntity } from '../entities/cat-entity';

@Injectable({
  providedIn: 'root'
})
export class CatsService {

  public readonly baseUrl = "https://cataas.com"

  getCat() : Observable<CatEntity> {
    return this.httpClien.get(this.baseUrl + "/cat?json=true") as Observable<CatEntity>
  }

  constructor(private httpClien: HttpClient) { }
}
