import { IParams } from '../paramsInteface';
import { FillShabeBase } from './absstracts';
import { IFillShapeParams } from './interfaces';

export class Triangle extends FillShabeBase {
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
      x2: null,
      y2: null,
      r: this._rotation,
      fontSize: null,
    };
  }

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
