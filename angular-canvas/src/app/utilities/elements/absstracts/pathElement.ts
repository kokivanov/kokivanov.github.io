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
    console.log('Drawing', this);
    this.makePath();
    ctx.save();
    ctx.strokeStyle = this._strokeStyle;
    ctx.stroke(this._path);
    if (this._selected) {
      console.log('Drawing selected', this);
      ctx.strokeStyle = 'blue';
      ctx.lineWidth = 4;
      ctx.setLineDash([8, 15]);
      ctx.stroke(this._path);
      ctx.setLineDash([]);
    }
    ctx.restore();
  }

  public drawTry(ctx: CanvasRenderingContext2D): void {
    this.makePath();
    ctx.save();
    ctx.strokeStyle = 'blue';
    ctx.stroke(this._path);
    ctx.restore();
  }

  public override drawHover(ctx: CanvasRenderingContext2D) {
    ctx.save();
    // this.draw(ctx);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 3;
    ctx.stroke(this.path);
    ctx.restore();
  }
}
