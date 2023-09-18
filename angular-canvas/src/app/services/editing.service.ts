import { Injectable } from '@angular/core';
import { Ellipse, Line, TextElem } from '../utilities/elements';
import { ElementBase, FillShabeBase } from '../utilities/elements/absstracts';
import { deepEqual } from '../utilities/objEqual';
import { IParams } from '../utilities/paramsInteface';
import { CanvasService } from './canvas.service';

@Injectable({
  providedIn: 'root',
})
export class EditingService {
  private _lastHover?: ElementBase;
  private _selectedShapes = Array<ElementBase>();
  private _multiselect = false;

  public get params(): IParams {
    const lastSelected = this._selectedShapes.at(
      this._selectedShapes.length - 1
    );
    if (lastSelected) {
      return lastSelected.params;
    } else {
      return {
        x: null,
        y: null,
        x2: null,
        y2: null,
        strokeStyle: '',
        fillStyle: null,
        name: '',
        h: 0,
        w: 0,
        r: 0,
        value: '',
        fontSize: null,
        src: '',
      };
    }
  }

  constructor(private readonly _canvasService: CanvasService) {}

  public useMultiselect() {
    this._multiselect = true;
  }

  public disableMultiselect() {
    this._multiselect = false;
  }

  private static doesCross(elem: ElementBase, x: number, y: number) {
    let x1: number, y1: number, x2: number, y2: number;
    x1 = elem.coords.x;
    y1 = elem.coords.y;

    if (elem instanceof Line) {
      x2 = elem.fullCoords.x2;
      y2 = elem.fullCoords.y2;
    } else if (elem instanceof Ellipse) {
      x1 = elem.coords.x - elem.width;
      y1 = elem.coords.y - elem.height;
      x2 = elem.coords.x + elem.width;
      y2 = elem.coords.y + elem.height;
    } else if (elem instanceof TextElem) {
      [x2, y2] = [-1, -1];
    } else {
      const elem2 = elem as FillShabeBase;
      x2 = x1 + elem2.width;
      y2 = y1 + elem2.height;
    }

    if (x1 < x2) {
      [x1, x2] = [x2, x1];
    }
    if (y1 < y2) {
      [y1, y2] = [y2, y1];
    }

    return x1 > x && x2 < x && y1 > y && y2 < y;
  }

  public selectShape() {
    console.log('Selecting ', this._lastHover);
    if (this._lastHover) {
      if (!this._multiselect) {
        for (let elem of this._selectedShapes) {
          elem.deselect();
        }
        this._selectedShapes = [];
      }
      if (this._lastHover.isSelected) {
        this._lastHover.deselect();
        this._selectedShapes = this._selectedShapes.filter(
          (v) => !deepEqual(v, this._lastHover)
        );
      } else {
        this._lastHover.select();
      }
      this._selectedShapes.push(this._lastHover);
      console.log(this._selectedShapes);
      this._canvasService.render();
    } else if (!this._multiselect) {
      for (let elem of this._selectedShapes) {
        elem.deselect();
      }
      this._selectedShapes = [];
      this._canvasService.render();
    }
  }

  public hoverShape(x: number, y: number) {
    if (this._lastHover) {
      if (!EditingService.doesCross(this._lastHover, x, y)) {
        this._lastHover = undefined;
        this._canvasService.render();
      }
      return;
    }

    for (let elem of [...this._canvasService.elements].reverse()) {
      console.log('Crosses ', elem.name);

      if (EditingService.doesCross(elem, x, y)) {
        this._canvasService.render();
        elem.drawHover(this._canvasService.context);
        this._lastHover = elem;
        return;
      }
    }
  }
}
