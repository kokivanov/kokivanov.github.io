import { IParams } from '../paramsInteface';
import { ElementBase } from './absstracts';
import { ITextParams } from './interfaces';

export class TextElem extends ElementBase {
  private _fontSize: number;
  private _value: string;

  public override get params(): IParams {
    return {
      name: this._name,
      x: this._x,
      y: this._y,
      value: this._value,
      src: '',
      strokeStyle: this._strokeStyle,
      fontSize: this._fontSize,
      x2: null,
      y2: null,
      h: this._fontSize,
      w: null,
      r: null,
      fillStyle: null,
    };
  }

  public set fontSize(v: number) {
    this._fontSize = v;
  }

  public get fontSize() {
    return this._fontSize;
  }

  public set value(v: string) {
    this._value = v;
  }

  public get value() {
    return this._value;
  }

  public constructor(params: ITextParams) {
    super(params);
    this._fontSize = params.fontSize || 30;
    this._value = params.value;
  }

  public override draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.font = `${this._fontSize}px serif`;
    ctx.strokeStyle = this.strokeStyle;
    ctx.fillStyle = this.strokeStyle;
    ctx.fillText(this._value, this._x, this._y);
    ctx.strokeText(this._value, this._x, this._y);

    if (this._selected) {
      ctx.strokeStyle = 'blue';
      ctx.lineWidth = 4;
      ctx.setLineDash([6, 3]);
      ctx.strokeText(this._value, this._x, this._y);
    }
    ctx.restore();
  }

  public override drawTry(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.font = `${this._fontSize}px serif`;
    ctx.fillStyle = 'blue';
    ctx.fillText(this._value, this._x, this._y);
    ctx.restore();
  }

  public override drawHover(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.font = `${this._fontSize}px serif`;
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 3;
    ctx.strokeText(this._value, this._x, this._y);
    ctx.restore();
  }
}
