import { IBaseParams } from '../interfaces';
import { ElementBase } from './elementBase';

export abstract class PathElement extends ElementBase {
  protected _path = new Path2D();

  constructor(params: IBaseParams) {
    super(params);
  }

  public get path() {
    return new Path2D(this._path);
  }

  public abstract makePath(): void;

  public draw(ctx: CanvasRenderingContext2D): void {
    this.makePath();
    ctx.save();
    ctx.strokeStyle = this._strokeStyle;
    ctx.stroke(this._path);
    ctx.restore();
  }

  public drawTry(ctx: CanvasRenderingContext2D): void {
    this.makePath();
    ctx.save();
    ctx.strokeStyle = 'blue';
    ctx.stroke(this._path);
    ctx.restore();
  }
}
