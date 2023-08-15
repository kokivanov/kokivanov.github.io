import { type } from "os";
import "./index.css";

console.log("HI!");
console.log("ASD!");
console.log("ASD!");

enum SelectOptions {
  RECTANGLE = "RECTANGLE",
  ELIPSE = "ELIPSE",
  LINE = "LINE",
  TRIANGLE = "TRIANGLE",
  TEXT = "TEXT",
  IMAGE = "IMAGE",
}

interface BaseParams {
  x?: number;
  y?: number;
  strokeStyle?: string;
  name?: string;
}

interface HYParams {
  h?: number;
  w?: number;
}

interface FillParams {
  fillStyle?: string;
}

interface ShapeParams extends BaseParams, HYParams, FillParams {
  r?: number;
}

interface LineParams extends BaseParams, HYParams {
  x2?: number;
  y2?: number;
}

interface TextParams extends BaseParams, FillParams {
  value: string;
  fontSize: number;
}

interface ImageParams extends BaseParams, HYParams {
  src: string;
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
}

class ShapeBase extends ElementBase {
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
}

class Rectangle extends ShapeBase {
  constructor(params: ShapeParams) {
    super(params);

    this.path = new Path2D();
    this.path.rect(this.x, this.y, this.width, this.height);
  }
}

class Triangle extends ShapeBase {
  constructor(params: ShapeParams) {
    super(params);

    this.path = new Path2D();
    this.path.moveTo(this.x + Math.ceil(this.width / 2), this.y);
    this.path.lineTo(this.x, this.y + this.height);
    this.path.lineTo(this.x + this.width, this.y + this.height);
    this.path.closePath();
  }
}

class Line extends ElementBase {
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
}

class Elipse extends ShapeBase {
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

class TextElem extends ElementBase {
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
}

class ImageElem extends ShapeBase {
  img = new Image();
  imgSrc: string;
  constructor(params: ImageParams) {
    super(params);
    this.imgSrc = params.src;
    console.log(this);
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.img.src = this.imgSrc;
    this.img.addEventListener("load", () => {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    });
  }
}

type Shape = ImageElem | TextElem | Line | Elipse | Rectangle | Triangle;

class Editor {
  ctx: CanvasRenderingContext2D;
  elements: Array<Shape>;
  selection: SelectOptions;
  constructor(private canvas: HTMLCanvasElement, elements: Array<Shape> = []) {
    if (canvas instanceof HTMLCanvasElement) {
      this.canvas.height = this.canvas.clientHeight;
      this.canvas.width = this.canvas.clientWidth;
      let context: CanvasRenderingContext2D | null;
      if (!(context = canvas.getContext("2d")))
        throw TypeError("Please provide valid canvas element");
      this.ctx = context;
      this.elements = elements || [];
      this.selection = SelectOptions.RECTANGLE;

      this.render();
    } else {
      throw TypeError("Must provide valid canvas element");
    }
  }

  addAuto(x: number, y: number) {
    const h = Math.ceil(Math.random() * 300);
    const w = Math.ceil(Math.random() * 300);
    switch (this.selection) {
      case SelectOptions.RECTANGLE:
        this.addElement(new Rectangle({ x, y, h, w }));
        break;
      case SelectOptions.ELIPSE:
        this.addElement(new Elipse({ x, y, h, w }));
        break;
      case SelectOptions.LINE:
        this.addElement(new Line({ x, y, x2: x + h, y2: y + w }));
        break;
      case SelectOptions.TRIANGLE:
        this.addElement(new Triangle({ x, y, h, w }));
        break;
      case SelectOptions.TEXT:
        const textInput = document.getElementById("text-input");
        if (!(textInput instanceof HTMLInputElement))
          TypeError("Must provide input element");
        else {
          this.addElement(
            new TextElem({ x, y, value: textInput.value, fontSize: h })
          );
        }
        break;
      case SelectOptions.IMAGE:
        const inputElement = document.getElementById("img-input");
        if (!(inputElement instanceof HTMLInputElement))
          throw TypeError("Must provide input element");
        if (inputElement.files) {
          const imgSrc = inputElement.files[0];
          this.addElement(
            new ImageElem({ x, y, src: URL.createObjectURL(imgSrc), h, w })
          );
        } else {
          alert("No image selected.");
          return;
        }
        break;
    }
  }

  changeSelection(option: SelectOptions = SelectOptions.RECTANGLE) {
    this.selection = option;
  }

  addElement(elem: Shape) {
    this.elements.push(elem);
    this.render();
  }

  removeElem(elemName: string) {
    this.elements = this.elements.filter((v) => {
      return v.name != elemName;
    });
  }

  render() {
    this.ctx.save();
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.fillRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
    this.ctx.restore();

    for (let element of this.elements) {
      element.draw(this.ctx);
    }
  }
}

window.addEventListener("load", () => {
  const toolbar = document.getElementById("toolbar");
  let curSelection = document.getElementById("rectangle-button");

  let editor: Editor;

  if (curSelection && toolbar) {
    curSelection.style.backgroundColor = "green";
    toolbar.addEventListener("click", (e) => {
      if (
        e.target &&
        (e.target instanceof HTMLDivElement ||
          (e.target as HTMLElement).id == "text-input" ||
          (e.target as HTMLElement).id == "img-input")
      )
        return;
      else if (curSelection) {
        const target = e.target as HTMLElement;
        curSelection.style.backgroundColor = target.style.backgroundColor;
        curSelection = e.target as HTMLElement;
        curSelection.style.backgroundColor = "green";
        editor.changeSelection(target.dataset.selection as SelectOptions);
      }
    });
  }

  const findCurPos = (e: MouseEvent) => {
    if (cursorPosition) {
      cursorPosition.innerText = `Cursor position: (x:${e.offsetX}, y:${e.offsetY})`;
    }
  };

  const cursorPosition = document.getElementById("cur-position");
  const canvas = document.getElementById("drawing-area");

  if (canvas && canvas instanceof HTMLCanvasElement) {
    editor = new Editor(canvas);
    canvas.addEventListener("mousemove", (e) => findCurPos(e));
    canvas.addEventListener("click", (e) =>
      editor.addAuto(e.offsetX, e.offsetY)
    );
  } else {
    throw TypeError("Cant work with provided canvas");
  }
});