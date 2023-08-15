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

  drawPreviw(path: Path2D) {
    this.ctx.save()
    this.ctx.fillStyle = ''
    this.ctx.strokeStyle = "blue"
    this.ctx.stroke(path)
    this.ctx.restore()
  }

  renderPreviw(x : number, y : number, h: number, w : number) {
    const path = new Path2D()
    path.rect(x, y, w, h)
    
    this.render()
    this.drawPreviw(path)
  }

  addAuto(
    x: number,
    y: number,
    h: number = Math.ceil(Math.random() * 300),
    w: number = Math.ceil(Math.random() * 300)
  ) {
    switch (this.selection) {
      case SelectOptions.RECTANGLE:
        this.addElement(new Rectangle({ x, y, h, w }));
        break;
      case SelectOptions.ELIPSE:
        this.addElement(new Elipse({ x, y, h, w }));
        break;
      case SelectOptions.LINE:
        this.addElement(new Line({ x, y, x2: x + w, y2: y + h }));
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
            new TextElem({ x, y: y+h, value: textInput.value, fontSize: h })
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
