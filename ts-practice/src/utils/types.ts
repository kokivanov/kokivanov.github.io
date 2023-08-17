import { ImageElem, TextElem, Line, Ellipse, Rectangle, Triangle } from "../elements";

export type stylingParams = string | CanvasGradient | CanvasPattern;
export type Shape = ImageElem | TextElem | Line | Ellipse | Rectangle | Triangle;

export enum SelectOptions {
  RECTANGLE = "RECTANGLE",
  ELIPSE = "ELIPSE",
  LINE = "LINE",
  TRIANGLE = "TRIANGLE",
  TEXT = "TEXT",
  IMAGE = "IMAGE",
}