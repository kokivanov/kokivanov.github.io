import { BaseParams } from "../../utils/interfaces";
import {ElementBase} from "./elementBase"

export abstract class PathElement extends ElementBase {
  protected _path = new Path2D();

  constructor(params: BaseParams) {
    super(params)
  }

  get path() {
    return new Path2D(this._path)
  }

  abstract makePath() : void;

  draw(ctx: CanvasRenderingContext2D): void {
    this.makePath()
    ctx.save()
    ctx.strokeStyle = this._strokeStyle
    ctx.stroke(this._path)
    ctx.restore()
  }

  drawTry(ctx: CanvasRenderingContext2D): void {
    this.makePath()
    ctx.save()
    ctx.strokeStyle = "blue"
    ctx.stroke(this._path)
    ctx.restore()
  }
}