import { ShapeParams } from "../utils/interfaces";
import { FillShabeBase } from "./absstracts";

export class Triangle extends FillShabeBase {
  public constructor(params: ShapeParams) {
    super(params);

  }
  
  public makePath(): void {
    this._path.moveTo(this._x + Math.ceil(this._width / 2), this._y);
    this._path.lineTo(this._x, this._y + this._height);
    this._path.lineTo(this._x + this._width, this._y + this._height);
    this._path.closePath();
  }
}