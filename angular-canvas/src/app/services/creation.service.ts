import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ElementFactory } from '../utilities/element-factory';
import { SelectOptions } from '../utilities/elements';
import { IParams } from '../utilities/paramsInteface';
import { CanvasService } from './canvas.service';

@Injectable({
  providedIn: 'root',
})
export class CreationService {
  private _selection: string = SelectOptions.RECTANGLE;

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

  private _selectionChange$ = new Subject<string>();
  public get selectionChange() {
    return this._selectionChange$.asObservable();
  }

  public get selection() {
    return this._selection;
  }

  constructor(private readonly _canvasService: CanvasService) {}

  private selectionToElement<
    T extends
      | SelectOptions.RECTANGLE
      | SelectOptions.ELLIPSE
      | SelectOptions.IMAGE
      | SelectOptions.TEXT
      | SelectOptions.TRIANGLE
      | SelectOptions.LINE
  >(type: T, params: any) {
    return ElementFactory.createElement(type, params);
  }

  public addAuto(
    type: SelectOptions,
    x: number,
    y: number,
    h?: number,
    w?: number
  ) {
    const elem = this.selectionToElement(type, { x, y, h, w });
    if (elem) {
      this._canvasService.addElement(elem);
    }
  }

  public setParams(params: IParams) {
    this.params = params;
  }

  public selectImage(imgSrc: string) {
    this.params.src = imgSrc;
  }

  public setText(src: string) {
    this.params.value = src;
  }

  public changeSelection(option: SelectOptions = SelectOptions.RECTANGLE) {
    if (option !== this._selection) {
      this._selection = option;
      this._selectionChange$.next(this._selection);
    }
  }
}
