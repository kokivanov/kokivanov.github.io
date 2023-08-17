import { ShapeParams } from "../utils/interfaces";
import { FillShabeBase } from "./absstracts";

export class Ellipse extends FillShabeBase {
  public constructor(params: ShapeParams) {
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