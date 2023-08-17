import { Ellipse, ImageElem, TextElem } from "../elements";

export function makeValidElipse(x: number, y: number, h?: number, w?: number) {
  if (h && h < 0) {
    y = y + h;
    h = Math.abs(h);
  }

  if (w && w < 0) {
    x = x + w;
    w = Math.abs(w);
  }
  return new Ellipse({ x, y, h, w });
}

export function makeValidText(value: string, x: number, y: number, h?: number) {
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

export function makeValidImage(
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