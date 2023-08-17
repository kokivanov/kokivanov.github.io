import {
  ImageElem,
  TextElem,
  Rectangle,
  Triangle,
  Ellipse,
  Line,
} from "./elements";
import { makeValidElipse, makeValidImage, makeValidText } from "./utils";
import { SelectOptions, Shape } from "./utils/types";

export class Editor {
  private _ctx: CanvasRenderingContext2D;
  private _elements: Array<Shape>;
  private _selection: SelectOptions = SelectOptions.RECTANGLE;

  private _textValue = "";
  private _imgSrc: string = "";

  onSelectionChange = (selection : SelectOptions) => {}

  get selection() {
    return this._selection
  }

  constructor(private readonly canvas: HTMLCanvasElement, elements: Array<Shape> = []) {
    if (canvas instanceof HTMLCanvasElement) {
      this.canvas.height = this.canvas.clientHeight;
      this.canvas.width = this.canvas.clientWidth;
      let context: CanvasRenderingContext2D | null;
      if (!(context = canvas.getContext("2d")))
        throw TypeError("Please provide valid canvas element");
      this._ctx = context;
      this._elements = elements || [];
      this._selection = SelectOptions.RECTANGLE;

      this.render();
    } else {
      throw TypeError("Must provide valid canvas element");
    }
  }

  drawPreviw(elem: Shape) {
    this.render();
    elem.drawTry(this._ctx);
  }

  renderPreviw(x: number, y: number, h: number, w: number) {
    const path = this.selectionToElement(x, y, h, w);

    if (path) {
      this.drawPreviw(path);
    }
  }

  selectionToElement(x: number, y: number, h?: number, w?: number) {
    switch (this._selection) {
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
        return makeValidText(this._textValue, x, y, h);
      case SelectOptions.IMAGE:
        return makeValidImage(this._imgSrc, x, y, h, w);
    }
  }

  addAuto(x: number, y: number, h?: number, w?: number) {
    const elem = this.selectionToElement(x, y, h, w);
    if (elem) {
      this.addElement(elem);
    }
  }

  changeSelection(option: SelectOptions = SelectOptions.RECTANGLE) {
    if (option !== this._selection) {
      if (option === SelectOptions.TEXT) {
        const input = prompt("Eneter text", this._textValue) || "";
        if (input) {
          this._textValue = input;
          this._selection = option;
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
              this._imgSrc = URL.createObjectURL(imgSrc);
              this._selection = option;
              this.onSelectionChange(this._selection)
            } else {
              alert("No image was selected");
            }
          } else {
            alert("No image was selected")
            this._selection = SelectOptions.RECTANGLE;
            this.onSelectionChange(this._selection)
            const rectButton = document.getElementById("rectangle-button");
            if (rectButton) {
              rectButton.click.apply(rectButton);
            }
          }
        });
      } else {
        this._selection = option;
      }

      this.onSelectionChange(this._selection)
    }
  }

  addElement(elem: Shape) {
    this._elements.push(elem);
    this.render();
  }

  removeElem(elemName: string) {
    this._elements = this._elements.filter((v) => {
      return v.name != elemName;
    });
  }

  clear() {
    this._ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
    this._elements = [];
  }

  render() {
    this._ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);

    for (let element of this._elements) {
      element.draw(this._ctx);
    }
  }
}
