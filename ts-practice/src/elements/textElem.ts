import { TextParams } from "../utils/interfaces";
import { ElementBase } from "./absstracts";

export class TextElem extends ElementBase {
  private _fontSize: number;
  private _value: string;

  public set fontSize(v : number) {
    this._fontSize = v
  }

  public get fontSize() {
    return this._fontSize
  }

  public set value(v : string) {
    this._value = v
  }

  public get value() {
    return this._value
  }

  public constructor(params: TextParams) {
    super(params);
    this._fontSize = params.fontSize || 30;
    this._value = params.value;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.font = `${this._fontSize}px serif`;
    ctx.strokeStyle = this.strokeStyle;
    ctx.fillStyle = this.strokeStyle;
    ctx.fillText(this._value, this._x, this._y);
    ctx.strokeText(this._value, this._x, this._y);
    ctx.restore();
  }

  public drawTry(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.font = `${this._fontSize}px serif`;
    ctx.fillStyle = "blue";
    ctx.fillText(this._value, this._x, this._y);
    ctx.restore();
  }
}