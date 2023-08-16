import {
  SelectOptions,
  Shape,
  ImageElem,
  TextElem,
  Rectangle,
  Triangle,
  Elipse,
  Line,
} from "./elements";

export class Editor {
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

  drawPreviw(elem: Shape) {
    this.render()
    elem.drawTry(this.ctx)
  }

  renderPreviw(x: number, y: number, h: number, w: number) {
    const path = this.selectionToElement(x, y, h, w);
    console.log("TRying render preview")

    if (path) {
      this.drawPreviw(path);
    }
  }

  selectionToElement(x: number, y: number, h: number, w: number) {
    switch (this.selection) {
      case SelectOptions.RECTANGLE:
        return new Rectangle({ x, y, h, w });
      case SelectOptions.ELIPSE:
        return new Elipse({ x, y, h, w });
      case SelectOptions.LINE:
        return new Line({ x, y, x2: x + w, y2: y + h });
      case SelectOptions.TRIANGLE:
        return new Triangle({ x, y, h, w });
      case SelectOptions.TEXT:
        const textInput = document.getElementById("text-input");
        if (!(textInput instanceof HTMLInputElement))
          TypeError("Must provide input element");
        else {
          return new TextElem({
            x,
            y: y + h,
            value: textInput.value,
            fontSize: h,
          });
        }
        break;
      case SelectOptions.IMAGE:
        const inputElement = document.getElementById("img-input");
        if (!(inputElement instanceof HTMLInputElement))
          throw TypeError("Must provide input element");
        if (inputElement.files) {
          const imgSrc = inputElement.files[0];
          return new ImageElem({
            x,
            y,
            src: URL.createObjectURL(imgSrc),
            h,
            w,
          });
        } else {
          alert("No image selected.");
          return;
        }
    }
  }

  addAuto(
    x: number,
    y: number,
    h: number = Math.ceil(Math.random() * 300),
    w: number = Math.ceil(Math.random() * 300)
  ) {
    const elem = this.selectionToElement(x, y, h, w);
    if (elem) {
      this.addElement(elem)
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

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
    this.elements = []
  }
  
  render() {
    this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);

    for (let element of this.elements) {
      element.draw(this.ctx);
    }
  }
}
