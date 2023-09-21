import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ElementFactory } from '../utilities/element-factory';
import { EnumSelectOptions } from '../utilities/elements';
import { IParams } from '../utilities/paramsInteface';
import { CanvasService } from './canvas.service';

@Injectable({
  providedIn: 'root',
})
export class CreationService {
  private _selection: EnumSelectOptions = EnumSelectOptions.HAND;

  public params: IParams = {
    x: 100,
    y: 100,
    strokeStyle: '#000000',
    name: 'Shape-1',
    h: 100,
    w: 100,
    fillStyle: '#FF0000',
    r: 0,
    x2: 200,
    y2: 200,
    value: 'Hello world!',
    fontSize: 14,
    src: '',
  };

  private _paramsType = 'fillParams';
  private _paramsTypeSubject$ = new Subject();

  public get paramsType() {
    return this._paramsTypeSubject$.asObservable();
  }

  private _selectionChange$ = new Subject<string>();
  public get selectionChange() {
    return this._selectionChange$.asObservable();
  }

  public get selection() {
    return this._selection;
  }

  constructor(private readonly _canvasService: CanvasService) {}

  public getParamsType() {
    if (this.selection == EnumSelectOptions.LINE) {
      return 'lineParams';
    } else if (this.selection == EnumSelectOptions.IMAGE) {
      return 'imageParams';
    } else if (this.selection == EnumSelectOptions.TEXT) {
      return 'textParams';
    } else {
      return 'fillParams';
    }
  }

  private selectionToElement<T extends EnumSelectOptions>(
    type: T,
    params: any
  ) {
    return ElementFactory.createElement(type, params);
  }

  public addAuto() {
    if (this._canvasService.lastElement?.name === this.params.name) {
      this.params.name = 'Shape - ' + Math.trunc(Math.random() * 1000000);
    }
    const elem = this.selectionToElement(this._selection, this.params);
    if (elem) {
      this._canvasService.addElement(elem);
    }
  }

  public setParams(params: Partial<IParams>) {
    Object.assign(this.params, params);
  }

  public selectImage(imgSrc: string) {
    this.params.src = imgSrc;
  }

  public setText(src: string) {
    this.params.value = src;
  }

  public changeSelection(
    option: EnumSelectOptions = EnumSelectOptions.RECTANGLE
  ) {
    if (option !== this._selection) {
      this._selection = option;
      this._selectionChange$.next(this._selection);
      this._paramsType = this.getParamsType();
      this._paramsTypeSubject$.next(this._paramsType);
    }
  }

  public addShape() {
    if (this._canvasService.lastElement?.name === this.params.name) {
      this.params.name = 'Shape - ' + Math.trunc(Math.random() * 1000000);
    }
    this._canvasService.addElement(
      this.selectionToElement(this._selection, this.params)
    );
    this._canvasService.render();
  }
}
