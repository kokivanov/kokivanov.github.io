import { Component, OnInit } from '@angular/core';
import { IItem } from 'src/app/entities/item';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  ngOnInit(): void {
    this._apiService.getItems().subscribe((v: [IItem[], IItem[]]) => {
      this._items = v[0].concat(v[1]);
    });
    this._apiService.checkState.subscribe(() => this.sub());
  }

  private sub() {
    this._apiService.getItems().subscribe((v: [IItem[], IItem[]]) => {
      this._items = v[0].concat(v[1]);
    });
  }

  private _items: IItem[] = [];
  public get items() {
    return this._items;
  }

  constructor(private readonly _apiService: ApiService) {}
}
