import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ElementFactory } from '../utilities/element-factory';
import { SelectOptions } from '../utilities/elements';
import { CanvasService } from './canvas.service';

@Injectable({
  providedIn: 'root',
})
export class CreationService {
  private _selection: string = SelectOptions.RECTANGLE;

  private _textValue = '';
  private _imgSrc = '';

  private _selectionChange$ = new Subject<string>();
  public get selectionChange() {
    return this._selectionChange$.asObservable();
  }

  public get selection() {
    return this._selection;
  }

  constructor(private readonly canvasService: CanvasService) {}

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
      this.canvasService.addElement(elem);
    }
  }

  public selectImage(imgSrc: string) {
    this._imgSrc = imgSrc;
  }

  public setText(src: string) {
    this._textValue = src;
  }

  public changeSelection(option: SelectOptions = SelectOptions.RECTANGLE) {
    if (option !== this._selection) {
      this._selection = option;
      this._selectionChange$.next(this._selection);
    }
  }
}
