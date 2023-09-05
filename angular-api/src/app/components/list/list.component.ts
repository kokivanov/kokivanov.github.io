import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, startWith } from 'rxjs';
import { IItem } from 'src/app/entities/item';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  private _itemsObservable$ = new Observable<IItem[]>();
  public get items() {
    return this._itemsObservable$;
  }

  private _stateSubscription$ = new Subscription();

  constructor(private readonly _apiService: ApiService) {}

  public ngOnDestroy(): void {
    this._stateSubscription$.unsubscribe();
  }

  public ngOnInit(): void {
    this._stateSubscription$.add(
      this._apiService.checkState
        .pipe(startWith(this._getItems()))
        .subscribe(() => this._getItems())
    );
  }

  private _getItems() {
    this._itemsObservable$ = this._apiService.getItems();
  }
}
