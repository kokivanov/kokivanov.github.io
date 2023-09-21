import { IParams } from '../paramsInteface';
import { PathElement } from './absstracts';
import { ILineParams } from './interfaces';

export class Line extends PathElement {
  private _x2: number;
  private _y2: number;

  public override get params(): IParams {
    return {
      name: this._name,
      x: this._x,
      y: this._y,
      value: '',
      src: '',
      strokeStyle: this._strokeStyle,
      fillStyle: '',
      w: this._x2 - this._x,
      h: this._y2 - this._y,
      r: null,
      x2: this._x2,
      y2: this._y2,
      fontSize: null,
    };
  }

  public override get coords() {
    return { x: this._x, y: this._y };
  }

  public override set coords({ x, y }: { x: number; y: number }) {
    this._x = x;
    this._y = y;
  }

  public get fullCoords() {
    return { x1: this._x, y1: this._y, x2: this._x2, y2: this._y2 };
  }

  public set fullCoords({
    x1,
    y1,
    x2,
    y2,
  }: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  }) {
    this._x = x1;
    this._y = y1;
    this._x2 = x2;
    this._y2 = y2;
  }

  public constructor(params: ILineParams) {
    super(params);
    this._x = params.x || 0;
    this._y = params.y || 0;
    this._x2 = params.x2 || this._x + 50;
    this._y2 = params.y2 || this._y + 50;
  }

  public makePath(): void {
    this._path = new Path2D();
    this._path.moveTo(this._x, this._y);
    this._path.lineTo(this._x2, this._y2);
  }

  public override draw(ctx: CanvasRenderingContext2D) {
    this.makePath();
    ctx.save();
    ctx.strokeStyle = this._strokeStyle;
    ctx.stroke(this._path);
    if (this._selected) {
      ctx.strokeStyle = 'blue';
      ctx.lineWidth = 4;
      ctx.setLineDash([8, 15]);
      ctx.stroke(this._path);
      ctx.setLineDash([]);
    }
    ctx.restore();
  }

  public override drawTry(ctx: CanvasRenderingContext2D) {
    this.makePath();
    ctx.save();
    ctx.strokeStyle = 'blue';
    ctx.stroke(this._path);
    ctx.restore();
  }

  public override setParams(params: Partial<IParams>): void {
    this._x2 = params.x2 ?? this._x2;
    this._y2 = params.y2 ?? this._y2;
    super.setParams(params);
  }
}
