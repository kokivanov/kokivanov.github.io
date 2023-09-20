import { IParams } from '../paramsInteface';
import { FillShabeBase } from './absstracts';
import { IShapeParams } from './interfaces';

export class Ellipse extends FillShabeBase {
  public override get params(): IParams {
    return {
      name: this._name,
      x: this._x - this._width,
      y: this._y - this._height,
      value: '',
      src: '',
      strokeStyle: this._strokeStyle,
      fillStyle: this._fillStyle,
      w: this._width * 2,
      h: this._height * 2,
      r: this._rotation,
      x2: null,
      y2: null,
      fontSize: null,
    };
  }

  public constructor(params: IShapeParams) {
    super(params);
    this._rotation = params.r || Math.PI;

    this._x = this._x + Math.ceil(this._width / 2);
    this._y = this._y + Math.ceil(this._height / 2);

    this._width = Math.ceil(this._width / 2);
    this._height = Math.ceil(this._height / 2);
  }

  public makePath(): void {
    this._path.ellipse(
      this._x,
      this._y,
      this._width,
      this._height,
      this._rotation,
      0,
      Math.PI * 2
    );
  }
}
