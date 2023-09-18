import { IParams } from '../paramsInteface';
import { FillShabeBase } from './absstracts';
import { IFillShapeParams } from './interfaces';

export class Rectangle extends FillShabeBase {
  public override get params(): IParams {
    return {
      name: this._name,
      x: this._x,
      y: this._y,
      value: '',
      src: '',
      strokeStyle: this._strokeStyle,
      fillStyle: this._fillStyle,
      w: this._width,
      h: this._height,
      r: 0,
      x2: null,
      y2: null,
      fontSize: null,
    };
  }

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
