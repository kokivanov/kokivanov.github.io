import { IParams } from '../../paramsInteface';
import { IFillShapeParams } from '../interfaces';
import { TypeStylingParams } from '../types';
import { ShapeBase } from './shapeBase';

export abstract class FillShabeBase extends ShapeBase {
  constructor(params: IFillShapeParams) {
    super(params);
    this._fillStyle = params.fillStyle || 'black';
  }

  protected _fillStyle: TypeStylingParams;

  public get fillStyle() {
    return this._fillStyle;
  }

  public set fillStyle(style: TypeStylingParams) {
    this._fillStyle = style;
  }

  public override draw(ctx: CanvasRenderingContext2D) {
    this.makePath();
    ctx.save();
    ctx.fillStyle = this._fillStyle;
    ctx.strokeStyle = this._strokeStyle;
    ctx.fill(this._path);
    super.draw(ctx);
    ctx.restore();
  }

  public override drawTry(ctx: CanvasRenderingContext2D) {
    this.makePath();
    ctx.save();
    ctx.fillStyle = '';
    ctx.strokeStyle = 'blue';
    ctx.stroke(this._path);
    ctx.restore();
  }

  public override setParams(params: Partial<IParams>): void {
    this._fillStyle = params.fillStyle ?? this._fillStyle;
    super.setParams(params);
  }
}
