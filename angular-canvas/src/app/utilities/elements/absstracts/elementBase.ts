import { IParams } from '../../paramsInteface';
import { IBaseParams } from '../interfaces';
import { TypeStylingParams } from '../types';

export abstract class ElementBase {
  protected _name: string;
  protected _strokeStyle: TypeStylingParams;
  protected _x: number;
  protected _y: number;
  protected _selected: boolean;

  public abstract get params(): IParams;

  public get isSelected() {
    return this._selected;
  }

  public get name() {
    return this._name;
  }

  public get strokeStyle() {
    return this._strokeStyle;
  }

  public set strokeStyle(style: TypeStylingParams) {
    this._strokeStyle = style;
  }

  public get coords() {
    return { x: this._x, y: this._y };
  }

  public set coords({ x, y }: { x: number; y: number }) {
    this._x = x;
    this._y = y;
  }

  constructor(params: IBaseParams) {
    this._name = params.name || this.constructor.name + '-' + Date.now();
    this.toString = () => this._name;
    this._strokeStyle = params.strokeStyle || 'black';
    this._x = params.x || 0;
    this._y = params.y || 0;
    this._selected = false;
  }

  public setParams(params: Partial<IParams>) {
    this._name = params.name ?? this._name;
    this._x = params.x ?? this._x;
    this._y = params.y ?? this._y;
    this._strokeStyle = params.strokeStyle ?? this._strokeStyle;
  }

  public select() {
    this._selected = true;
  }

  public deselect() {
    this._selected = false;
  }

  public abstract draw(ctx: CanvasRenderingContext2D): void;
  public abstract drawTry(ctx: CanvasRenderingContext2D): void;
  public abstract drawHover(ctx: CanvasRenderingContext2D): void;
}
