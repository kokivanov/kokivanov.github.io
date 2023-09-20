import { IParams } from '../paramsInteface';
import { FillShabeBase } from './absstracts';
import { IShapeParams } from './interfaces';

export class Ellipse extends FillShabeBase {
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
      r: this._rotation,
      x2: null,
      y2: null,
      fontSize: null,
    };
  }

  public constructor(params: IShapeParams) {
    super(params);
    this._rotation = params.r || Math.PI;
  }

  public makePath(): void {
    const x = this._x + Math.ceil(this._width / 2);
    const y = this._y + Math.ceil(this._height / 2);
    const width = Math.ceil(this._width / 2);
    const height = Math.ceil(this._height / 2);

    this._path = new Path2D();
    this._path.ellipse(x, y, width, height, this._rotation, 0, Math.PI * 2);
  }
}
