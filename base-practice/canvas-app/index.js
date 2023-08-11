class ElementBase {
  constructor({ x, y, fillStyle, strokeStyle }) {
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
    this.height = params.h || 50;
    this.width = params.w || 50;

    this.path = new Path2D();
    this.path.rect(this.x, this.y, this.width, this.height);
  }
}

class Editor {
  constructor(canvas, elements = []) {
    if (canvas instanceof HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.elements = elements || [];

        this.render()
    } else {
      throw TypeError("Must provide valid canvas element");
    }
  }

  render() {
    this.ctx.save();
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.fillRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
    this.ctx.restore()

    for (let element of this.elements) {
        element.draw(this.ctx)
    }
  }
}
