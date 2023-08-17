import { ShapeParams } from "../utils/interfaces";
import { FillShabeBase } from "./absstracts";

export class Rectangle extends FillShabeBase {
  public constructor(params: ShapeParams) {
    super(params);
  }

  public makePath(): void {
    this._path.rect(this._x, this._y, this._width, this._height);
  }
  
  public draw(ctx: CanvasRenderingContext2D): void {
    this.makePath()
    super.draw(ctx)
  }

  public drawTry(ctx: CanvasRenderingContext2D): void {
    this.makePath()
    super.drawTry(ctx)
  }
}