import { BaseParams, ShapeParams, TextParams, ImageParams, LineParams, FillShapeParams } from "./interfaces"; 
import { stylingParams } from "./types";


abstract class ElementBase {
  protected _name: string;
  protected _strokeStyle: stylingParams;
  protected _x: number;
  protected _y: number;
  
  get name() {
    return this._name
  };
  
  get strokeStyle() {
    return this._strokeStyle
  }
  
  get coords() {
    return {x: this._x, y: this._y}
  }
  
  set coords({x, y}:{x: number, y:number}) {
    this._x = x;
    this._y = y;
  }

  set strokeStyle(style: stylingParams) {
    this._strokeStyle = style
  }
  
  protected constructor(params: BaseParams) {
    this._name = params.name || this.constructor.name + "-" + Date.now();
    this.toString = () => this._name;
    this._strokeStyle = params.strokeStyle || "black";
    this._x = params.x || 0;
    this._y = params.y || 0;
  }
  
  abstract draw(ctx: CanvasRenderingContext2D) : void;
  abstract drawTry(ctx: CanvasRenderingContext2D) : void;
}

abstract class PathElement extends ElementBase {
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

abstract class ShapeBase extends PathElement {
  protected _height: number;
  protected _width: number;
  protected _rotation: number;

  get height() {
    return this._height
  } 

  set height(h: number) {
    this._height = h
  }

  get width() {
    return this._width
  } 

  set width(w: number) {
    this._width = w
  }

  get rotationDegrees() {
    return (this._rotation * 180) / Math.PI
  }

  set rotationDegrees(d: number) {
    this._rotation = (d * Math.PI) / 180
  }

  get rotation(){
    return this._rotation
  }

  set rotation(r: number){
    this._rotation = r
  }

  protected constructor(params: ShapeParams) {
    super(params);


    this._height = params.h || 50;
    this._width = params.w || 50;
    this._rotation = params.r || 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.strokeStyle = this._strokeStyle;
    ctx.fill(this._path);
    ctx.stroke(this._path);
    ctx.restore();
  }

  drawTry(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.strokeStyle = 'blue';
    ctx.stroke(this._path);
    ctx.restore();
  }
}

abstract class FillShabeBase extends ShapeBase {
  constructor(params: FillShapeParams) {
    super(params);
    this._fillStyle = params.fillStyle || "black";
  }

  protected _fillStyle: stylingParams;

  get fillStyle() {
    return this._fillStyle
  }

  set fillStyle(style: stylingParams) {
    this._fillStyle = style
  }

  
  draw(ctx: CanvasRenderingContext2D) {
    this.makePath()
    ctx.save();
    ctx.fillStyle = this._fillStyle;
    ctx.strokeStyle = this._strokeStyle;
    ctx.fill(this._path);
    ctx.stroke(this._path);
    ctx.restore();
  }

  drawTry(ctx: CanvasRenderingContext2D) {
    this.makePath()
    ctx.save();
    ctx.fillStyle = '';
    ctx.strokeStyle = 'blue';
    ctx.stroke(this._path);
    ctx.restore();
  }
}

export class Rectangle extends FillShabeBase {
  constructor(params: ShapeParams) {
    super(params);
  }

  makePath(): void {
    this._path.rect(this._x, this._y, this._width, this._height);
  }
  
  draw(ctx: CanvasRenderingContext2D): void {
    this.makePath()
    super.draw(ctx)
  }

  drawTry(ctx: CanvasRenderingContext2D): void {
    this.makePath()
    super.drawTry(ctx)
  }
}

export class Triangle extends FillShabeBase {
  constructor(params: ShapeParams) {
    super(params);

  }
  
  makePath(): void {
    this._path.moveTo(this._x + Math.ceil(this._width / 2), this._y);
    this._path.lineTo(this._x, this._y + this._height);
    this._path.lineTo(this._x + this._width, this._y + this._height);
    this._path.closePath();
  }
}

export class Line extends PathElement {
  _x2: number;
  _y2: number;

  get coords() {
    return {x: this._x, y: this._y}
  }
  
  set coords({x, y}:{x: number, y:number}) {
    this._x = x;
    this._y = y;
  }

  get fullCoords() {
    return {x1: this._x, y1: this._y, x2: this._x2, y2: this._y2}
  }
  
  set fullCoords({x1, y1, x2, y2}:{x1: number, y1:number, x2: number, y2: number}) {
    this._x = x1;
    this._y = y1;
    this._x2 = x2;
    this._y2 = y2;
  }

  constructor(params: LineParams) {
    super(params);
    this._x = params.x || 0;
    this._y = params.y || 0;
    this._x2 = params.x2 || this._x + 50;
    this._y2 = params.y2 || this._y + 50;
  }

  makePath(): void {    
    this._path.moveTo(this._x, this._y);
    this._path.lineTo(this._x2, this._y2);
  }
  
  draw(ctx: CanvasRenderingContext2D) {
    this.makePath()
    ctx.save();
    ctx.strokeStyle = this._strokeStyle;
    ctx.stroke(this._path);
    ctx.restore();
  }

  drawTry(ctx: CanvasRenderingContext2D) {
    this.makePath()
    ctx.save();
    ctx.strokeStyle = "blue";
    ctx.stroke(this._path);
    ctx.restore();
  }
}

export class Elipse extends FillShabeBase {
  constructor(params: ShapeParams) {
    super(params);
    this._rotation = params.r || Math.PI;

    this._x = this._x + Math.ceil(this._width / 2);
    this._y = this._y + Math.ceil(this._height / 2);

    this._width = Math.ceil(this._width / 2);
    this._height = Math.ceil(this._height / 2);

  }
  
  makePath(): void {
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

export class TextElem extends ElementBase {
  _fontSize: number;
  _value: string;

  constructor(params: TextParams) {
    super(params);
    this._fontSize = params.fontSize || 30;
    this._value = params.value;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.font = `${this._fontSize}px serif`;
    ctx.strokeStyle = this.strokeStyle;
    ctx.fillStyle = this.strokeStyle;
    ctx.fillText(this._value, this._x, this._y);
    ctx.strokeText(this._value, this._x, this._y);
    ctx.restore();
  }

  drawTry(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.font = `${this._fontSize}px serif`;
    ctx.fillStyle = "blue";
    ctx.fillText(this._value, this._x, this._y);
    ctx.restore();
  }
}

export class ImageElem extends ShapeBase {
  private _img = new Image();
  private _imgSrc: string;
  private _isLoaded = false;
  constructor(params: ImageParams) {
    super(params);
    this._imgSrc = params.src;
    this._height = params.h || 0
    this._width = params.w || 0
  }
  
  makePath(): void {
    if (this._height === 0 && this._width === 0) {
      this._height = this._img.height
      this._width = this._img.width
    }
    this._path.rect(this._x, this._y, this._width, this._height)
  }

  drawTry(ctx: CanvasRenderingContext2D): void {
    this.makePath()
    super.drawTry(ctx)
  }

  draw(ctx: CanvasRenderingContext2D) {
    this._img.src = this._imgSrc;
    if (this._isLoaded) {
      this.makePath()
      ctx.drawImage(this._img, this._x, this._y, this._width, this._height);
    } else {
      this._img.addEventListener("load", () => {
        this.makePath()
        ctx.drawImage(this._img, this._x, this._y, this._width, this._height);
        this._isLoaded = true
      });
    }
  }
}

