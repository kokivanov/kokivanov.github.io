import { IShapeParams } from '../interfaces';
import { PathElement } from './pathElement';

export abstract class ShapeBase extends PathElement {
  protected _height: number;
  protected _width: number;
  protected _rotation: number;

  public get height() {
    return this._height;
  }

  public set height(h: number) {
    this._height = h;
  }

  public get width() {
    return this._width;
  }

  public set width(w: number) {
    this._width = w;
  }

  public get rotationDegrees() {
    return (this._rotation * 180) / Math.PI;
  }

  public set rotationDegrees(d: number) {
    this._rotation = (d * Math.PI) / 180;
  }

  public get rotation() {
    return this._rotation;
  }

  public set rotation(r: number) {
    this._rotation = r;
  }

  constructor(params: IShapeParams) {
    super(params);

    this._height = params.h || 50;
    this._width = params.w || 50;
    this._rotation = params.r || 0;
  }

  public override draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.strokeStyle = this._strokeStyle;
    ctx.stroke(this._path);
    super.draw(ctx);
    ctx.restore();
  }

  public override drawTry(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.strokeStyle = 'blue';
    ctx.stroke(this._path);
    ctx.restore();
  }
}
