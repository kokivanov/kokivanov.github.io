import { FillShabeBase } from './absstracts';
import { IFillShapeParams } from './interfaces';

export class Triangle extends FillShabeBase {
  public constructor(params: IFillShapeParams) {
    super(params);
  }

  public override makePath(): void {
    this._path.moveTo(this._x + Math.ceil(this._width / 2), this._y);
    this._path.lineTo(this._x, this._y + this._height);
    this._path.lineTo(this._x + this._width, this._y + this._height);
    this._path.closePath();
  }
}
