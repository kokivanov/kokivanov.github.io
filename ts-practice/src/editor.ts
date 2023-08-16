import {
  ImageElem,
  TextElem,
  Rectangle,
  Triangle,
  Elipse,
  Line,
} from "./elements";
import { SelectOptions, Shape } from "./types";

function makeValidElipse(x: number, y: number, h?: number, w?: number) {
  if (h && h < 0) {
    y = y + h;
    h = Math.abs(h);
  }

  if (w && w < 0) {
    x = x + w;
    w = Math.abs(w);
  }
  return new Elipse({ x, y, h, w });
}

function makeValidText(value: string, x: number, y: number, h?: number) {
  if (value) {
    return new TextElem({
      x,
      y: y + (h || 0),
      value: value,
      fontSize: h,
    });
  } else {
    alert("Cant write no text");
    return;
  }
}

function makeValidImage(
  src: string,
  x: number,
  y: number,
  h?: number,
  w?: number
) {
  if (src) {
    return new ImageElem({
      x,
      y,
      src: src,
      h,
      w,
    });
  } else {
    alert("No image selected.");
    return;
  }
}

export class Editor {
  ctx: CanvasRenderingContext2D;
  elements: Array<Shape>;
  selection: SelectOptions = SelectOptions.RECTANGLE;

  textValue = "";
  imgSrc: string = "";

  onSelectionChange = (selection : SelectOptions) => {}

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

  drawPreviw(elem: Shape) {
    this.render();
    elem.drawTry(this.ctx);
  }

  renderPreviw(x: number, y: number, h: number, w: number) {
    const path = this.selectionToElement(x, y, h, w);

    if (path) {
      this.drawPreviw(path);
    }
  }

  selectionToElement(x: number, y: number, h?: number, w?: number) {
    switch (this.selection) {
      case SelectOptions.RECTANGLE:
        return new Rectangle({ x, y, h, w });
      case SelectOptions.ELIPSE:
        return makeValidElipse(x, y, h, w);
      case SelectOptions.LINE:
        return new Line({
          x,
          y,
          x2: w ? x + w : undefined,
          y2: h ? y + h : undefined,
        });
      case SelectOptions.TRIANGLE:
        return new Triangle({ x, y, h, w });
      case SelectOptions.TEXT:
        return makeValidText(this.textValue, x, y, h);
      case SelectOptions.IMAGE:
        return makeValidImage(this.imgSrc, x, y, h, w);
    }
  }

  addAuto(x: number, y: number, h?: number, w?: number) {
    const elem = this.selectionToElement(x, y, h, w);
    if (elem) {
      this.addElement(elem);
    }
  }

  changeSelection(option: SelectOptions = SelectOptions.RECTANGLE) {
    if (option !== this.selection) {
      if (option === SelectOptions.TEXT) {
        const input = prompt("Eneter text", this.textValue) || "";
        if (input) {
          this.textValue = input;
          this.selection = option;
        } else {
          alert("Cant render empty string");
        }
      } else if (option === SelectOptions.IMAGE) {
        const inputElement = document.getElementById("img-input");

        if (!(inputElement instanceof HTMLInputElement)) {
          throw TypeError("Must provide input element");
        }
        inputElement.click.apply(inputElement);

        inputElement.addEventListener("change", () => {
          if (inputElement.files && inputElement.files.length > 0) {
            const imgSrc = inputElement.files[0];
            if (imgSrc) {
              this.imgSrc = URL.createObjectURL(imgSrc);
              this.selection = option;
              this.onSelectionChange(this.selection)
            } else {
              alert("No image was selected");
            }
          } else {
            alert("No image was selected")
            this.selection = SelectOptions.RECTANGLE;
            this.onSelectionChange(this.selection)
            const rectButton = document.getElementById("rectangle-button");
            if (rectButton) {
              rectButton.click.apply(rectButton);
            }
          }
        });
      } else {
        this.selection = option;
      }

      this.onSelectionChange(this.selection)
    }
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

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
    this.elements = [];
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);

    for (let element of this.elements) {
      element.draw(this.ctx);
    }
  }
}
