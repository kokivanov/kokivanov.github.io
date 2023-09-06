import { FillShabeBase } from './absstracts';
import { IFillShapeParams } from './interfaces';

export class Rectangle extends FillShabeBase {
  public constructor(params: IFillShapeParams) {
    super(params);
  }

  public makePath(): void {
    this._path.rect(this._x, this._y, this._width, this._height);
  }

  public override draw(ctx: CanvasRenderingContext2D): void {
    this.makePath();
    super.draw(ctx);
  }

  public override drawTry(ctx: CanvasRenderingContext2D): void {
    this.makePath();
    super.drawTry(ctx);
  }
}
