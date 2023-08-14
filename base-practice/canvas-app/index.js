const RECTANGLE_OPTION = "RECTANGLE";
const ELIPSE_OPTION = "ELIPSE";
const LINE_OPTION = "LINE";
const TRIANGLE_OPTION = "TRIANGLE";
const TEXT_OPTION = "TEXT";
const IMAGE_OPTION = "IMAGE";

class ElementBase {
  constructor({ name, x, y, fillStyle, strokeStyle }) {
    this.name = name ? name : this.constructor.name + "-" + Date.now();
    this.toString = () => this.name;
    this.fillStyle = fillStyle || "black";
    this.strokeStyle = strokeStyle || "black";
    this.x = x || 0;
    this.y = y || 0;
  }

  draw(ctx) {
    throw new ReferenceError("NotImplemented");
  }
}

class ShapeBase extends ElementBase {
  constructor(params) {
    super(params);

    this.height = params.h || 50;
    this.width = params.w || 50;
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = this.fillStyle;
    ctx.strokeStyle = this.strokeStyle;
    ctx.fill(this.path);
    ctx.stroke(this.path);
    ctx.restore();
  }
}

class Rectangle extends ShapeBase {
  constructor(params) {
    super(params);

    this.path = new Path2D();
    this.path.rect(this.x, this.y, this.width, this.height);
  }
}

class Triangle extends ShapeBase {
  constructor(params) {
    super(params);

    this.path = new Path2D();
    this.path.moveTo(this.x + Math.ceil(this.width / 2), this.y);
    this.path.lineTo(this.x, this.y + this.height);
    this.path.lineTo(this.x + this.width, this.y + this.height);
    this.path.closePath();
  }
}

class Line extends ElementBase {
  constructor(params) {
    super(params);
    this.x1 = params.x;
    this.x2 = params.x2;
    this.y1 = params.y;
    this.y2 = params.y2;

    this.path = new Path2D();
    this.path.moveTo(this.x1, this.y1);
    this.path.lineTo(this.x2, this.y2);
  }

  draw(ctx) {
    ctx.save();
    ctx.strokeStyle = this.strokeStyle;
    ctx.stroke(this.path);
    ctx.restore();
  }
}

class Elipse extends ShapeBase {
  constructor(params) {
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
  constructor(params) {
    super(params);
    this.fontSize = params.fontSize || 30;
    this.value = params.value;
  }

  draw(ctx) {
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
  constructor(params) {
    super(params);
    this.imgSrc = params.src;
    this.img = new Image();
    console.log(this);
  }

  draw(ctx) {
    this.img.src = this.imgSrc;
    this.img.addEventListener("load", () => {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    });
  }
}

class Editor {
  constructor(canvas, elements = []) {
    if (canvas instanceof HTMLCanvasElement) {
      this.canvas = canvas;
      this.canvas.height = this.canvas.clientHeight;
      this.canvas.width = this.canvas.clientWidth;
      this.ctx = canvas.getContext("2d");
      this.elements = elements || [];
      this.selection = RECTANGLE_OPTION;

      this.render();
    } else {
      throw TypeError("Must provide valid canvas element");
    }
  }

  addAuto(x, y) {
    const h = Math.ceil(Math.random() * 300);
    const w = Math.ceil(Math.random() * 300);
    switch (this.selection) {
      case RECTANGLE_OPTION:
        this.addElement(new Rectangle({ x, y, h, w }));
        break;
      case ELIPSE_OPTION:
        this.addElement(new Elipse({ x, y, h, w }));
        break;
      case LINE_OPTION:
        this.addElement(new Line({ x, y, x2: x + h, y2: y + w }));
        break;
      case TRIANGLE_OPTION:
        this.addElement(new Triangle({ x, y, h, w }));
        break;
      case TEXT_OPTION:
        const textInput = document.getElementById("text-input");
        this.addElement(new TextElem({ x, y, value: textInput.value, fontSize: h }));
        break;
      case IMAGE_OPTION:
        const [imgSrc] = document.getElementById("img-input").files;
        if (imgSrc) {
          this.addElement(new ImageElem({x, y, src: URL.createObjectURL(imgSrc), h, w}));
        } else {
          alert("No image selected.");
          return;
        }
        break;
    }
  }

  changeSelection(option) {
    this.selection = option;
  }

  addElement(elem) {
    this.elements.push(elem);
    this.render();
  }

  removeElem(elemName) {
    this.elements = this.elements.filter((v) => {
      return v != elemName;
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
  curSelection.style.backgroundColor = "green";
  toolbar.addEventListener("click", (e) => {
    if (
      e.target instanceof HTMLDivElement ||
      e.target.id == "text-input" ||
      e.target.id == "img-input"
    )
      return;
    else {
      curSelection.style.backgroundColor = e.target.style.backgroundColor;
      curSelection = e.target;
      curSelection.style.backgroundColor = "green";
      editor.changeSelection(e.target.dataset.selection);
    }
  });

  const findCurPos = (e) => {
    cursorPosition.innerText = `Cursor position: (x:${e.offsetX}, y:${e.offsetY})`;
  };

  const cursorPosition = document.getElementById("cur-position");
  const canvas = document.getElementById("drawing-area");
  const editor = new Editor(canvas);

  canvas.addEventListener("mousemove", (e) => findCurPos(e));
  canvas.addEventListener("click", (e) => editor.addAuto(e.offsetX, e.offsetY));
});
