import { Injectable } from '@angular/core';
import { Ellipse, Line, Rectangle, TextElem } from '../utilities/elements';
import { ElementBase, FillShabeBase } from '../utilities/elements/absstracts';
import { deepEqual } from '../utilities/objEqual';
import { IParams } from '../utilities/paramsInteface';
import { typeToEnum, typeToParams } from '../utilities/typeToParams';
import { CanvasService } from './canvas.service';

@Injectable({
  providedIn: 'root',
})
export class EditingService {
  private _lastHover?: ElementBase;
  private _selectedShapes = Array<ElementBase>();
  private _multiselect = false;
  private _wasMoved = false;

  // public isShapeSElected

  public get params(): IParams {
    const lastSelected = this._selectedShapes.at(
      this._selectedShapes.length - 1
    );
    if (lastSelected) {
      return lastSelected.params;
    } else {
      return {
        x: 100,
        y: 100,
        x2: 200,
        y2: 200,
        strokeStyle: 'black',
        fillStyle: 'red',
        name: '',
        h: 100,
        w: 100,
        r: 0,
        value: 'Hello world!',
        fontSize: 14,
        src: '',
      };
    }
  }

  public get paramsType() {
    return typeToParams(this._selectedShapes.at(-1) ?? new Rectangle({}));
  }

  public get selectedShapes() {
    return [...this._selectedShapes];
  }

  constructor(private readonly _canvasService: CanvasService) {}

  public useMultiselect() {
    this._multiselect = true;
  }

  public disableMultiselect() {
    this._multiselect = false;
  }

  public removeSelectedShapes() {
    for (let elem of this._selectedShapes) {
      this._canvasService.removeElem(elem.name);
    }

    this._selectedShapes = [];
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
      [x2, y2] = [
        elem.coords.x + elem.value.length * Math.ceil((elem.fontSize / 7) * 3),
        elem.coords.y,
      ];
      y1 = elem.coords.y - elem.fontSize;
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

  public useParams(params: IParams) {
    for (let elem of this._selectedShapes) {
      elem.setParams(params);
    }
  }

  public selectShape() {
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
      this._canvasService.render();
    } else if (!this._multiselect) {
      for (let elem of this._selectedShapes) {
        elem.deselect();
      }
      this._selectedShapes = [];
      this._canvasService.render();
    }
  }

  public prepareMove() {
    this._wasMoved = true;
    for (let elem of this._selectedShapes) {
      this._canvasService.removeElem(elem.name);
    }
  }

  public moveShapes(dx: number, dy: number) {
    for (let elem of this._selectedShapes) {
      elem.setParams({ x: elem.coords.x + dx, y: elem.coords.y + dy });
    }

    this._canvasService.render();
    for (let elem of this._selectedShapes) {
      this._canvasService.renderPreviw(typeToEnum(elem), elem.params);
    }
  }

  public commitMovement() {
    if (this._wasMoved) {
      for (let elem of this._selectedShapes) {
        this._canvasService.addElement(elem);
      }
      this._wasMoved = false;
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
      if (EditingService.doesCross(elem, x, y)) {
        this._canvasService.render();
        elem.drawHover(this._canvasService.context);
        this._lastHover = elem;
        return;
      }
    }
  }
}
