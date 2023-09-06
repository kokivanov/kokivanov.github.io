import { ShapeBase } from './absstracts';
import { IImageParams } from './interfaces';

export class ImageElem extends ShapeBase {
  private _img = new Image();
  private _imgSrc: string;
  private _isLoaded = false;

  public get img() {
    return this._img;
  }

  public set imgSrc(src: string) {
    this._imgSrc = src;
    this._img.src = this._imgSrc;
  }

  public constructor(params: IImageParams) {
    super(params);
    this._imgSrc = params.src;
    this._height = params.h || 0;
    this._width = params.w || 0;
  }

  public makePath(): void {
    if (this._height === 0 && this._width === 0) {
      this._height = this._img.height;
      this._width = this._img.width;
    }
    this._path.rect(this._x, this._y, this._width, this._height);
  }

  public override drawTry(ctx: CanvasRenderingContext2D): void {
    this.makePath();
    super.drawTry(ctx);
  }

  public override draw(ctx: CanvasRenderingContext2D) {
    this._img.src = this._imgSrc;
    if (this._isLoaded) {
      this.makePath();
      ctx.drawImage(this._img, this._x, this._y, this._width, this._height);
    } else {
      this._img.addEventListener('load', () => {
        this.makePath();
        ctx.drawImage(this._img, this._x, this._y, this._width, this._height);
        this._isLoaded = true;
      });
    }
  }
}
