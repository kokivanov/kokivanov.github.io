import { BaseParams, ShapeParams, TextParams, ImageParams, LineParams } from "./interfaces"; 

export enum SelectOptions {
  RECTANGLE = "RECTANGLE",
  ELIPSE = "ELIPSE",
  LINE = "LINE",
  TRIANGLE = "TRIANGLE",
  TEXT = "TEXT",
  IMAGE = "IMAGE",
}

class ElementBase {
  name: string;
  strokeStyle: string;
  x: number;
  y: number;

  constructor(params: BaseParams) {
    this.name = params.name || this.constructor.name + "-" + Date.now();
    this.toString = () => this.name;
    this.strokeStyle = params.strokeStyle || "black";
    this.x = params.x || 0;
    this.y = params.y || 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    throw new ReferenceError("NotImplemented");
  }

  drawTry(ctx: CanvasRenderingContext2D) {
    throw new ReferenceError("NotImplemented");
  }
}

export class ShapeBase extends ElementBase {
  height: number;
  width: number;
  fillStyle: string;
  path = new Path2D();
  rotation: number;

  constructor(params: ShapeParams) {
    super(params);

    this.fillStyle = params.fillStyle || "black";
    this.height = params.h || 50;
    this.width = params.w || 50;
    this.rotation = params.r || 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.fillStyle = this.fillStyle;
    ctx.strokeStyle = this.strokeStyle;
    ctx.fill(this.path);
    ctx.stroke(this.path);
    ctx.restore();
  }

  drawTry(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.fillStyle = '';
    ctx.strokeStyle = 'blue';
    ctx.stroke(this.path);
    ctx.restore();
  }
}

export class Rectangle extends ShapeBase {
  constructor(params: ShapeParams) {
    super(params);

    this.path = new Path2D();
    this.path.rect(this.x, this.y, this.width, this.height);
  }
}

export class Triangle extends ShapeBase {
  constructor(params: ShapeParams) {
    super(params);

    this.path = new Path2D();
    this.path.moveTo(this.x + Math.ceil(this.width / 2), this.y);
    this.path.lineTo(this.x, this.y + this.height);
    this.path.lineTo(this.x + this.width, this.y + this.height);
    this.path.closePath();
  }
}

export class Line extends ElementBase {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  path: Path2D;

  constructor(params: LineParams) {
    super(params);
    this.x1 = params.x || 0;
    this.x2 = params.x2 || 0;
    this.y1 = params.y || 50;
    this.y2 = params.y2 || 50;

    this.path = new Path2D();
    this.path.moveTo(this.x1, this.y1);
    this.path.lineTo(this.x2, this.y2);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.strokeStyle = this.strokeStyle;
    ctx.stroke(this.path);
    ctx.restore();
  }

  drawTry(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.strokeStyle = "blue";
    ctx.stroke(this.path);
    ctx.restore();
  }
}

export class Elipse extends ShapeBase {
  constructor(params: ShapeParams) {
    super(params);
    this.rotation = params.r || Math.PI;

    this.x = this.x + Math.ceil(this.width / 2);
    this.y = this.y + Math.ceil(this.height / 2);

    this.width = Math.ceil(this.width / 2);
    this.height = Math.ceil(this.height / 2);

    this.path = new Path2D();
    this.path.ellipse(
      this.x,
      this.y,
      this.width,
      this.height,
      this.rotation,
      0,
      Math.PI * 2
    );
  }
}

export class TextElem extends ElementBase {
  fontSize: number;
  value: string;

  constructor(params: TextParams) {
    super(params);
    this.fontSize = params.fontSize || 30;
    this.value = params.value;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.font = `${this.fontSize}px serif`;
    ctx.strokeStyle = this.strokeStyle;
    ctx.fillStyle = this.strokeStyle;
    ctx.fillText(this.value, this.x, this.y);
    ctx.strokeText(this.value, this.x, this.y);
    ctx.restore();
  }

  drawTry(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.font = `${this.fontSize}px serif`;
    ctx.fillStyle = "blue";
    ctx.fillText(this.value, this.x, this.y);
    ctx.restore();
  }
}

export class ImageElem extends ShapeBase {
  img = new Image();
  imgSrc: string;
  isLoaded = false;
  constructor(params: ImageParams) {
    super(params);
    this.imgSrc = params.src;
    this.path.rect(this.x, this.y, this.width, this.height)
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.img.src = this.imgSrc;
    if (this.isLoaded) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } else {
      this.img.addEventListener("load", () => {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        this.isLoaded = true
      });
    }
  }
}

export type Shape = ImageElem | TextElem | Line | Elipse | Rectangle | Triangle;
