import { ImageElem, TextElem, Line, Elipse, Rectangle, Triangle } from "./elements";

export type stylingParams = string | CanvasGradient | CanvasPattern;
export type Shape = ImageElem | TextElem | Line | Elipse | Rectangle | Triangle;

export enum SelectOptions {
  RECTANGLE = "RECTANGLE",
  ELIPSE = "ELIPSE",
  LINE = "LINE",
  TRIANGLE = "TRIANGLE",
  TEXT = "TEXT",
  IMAGE = "IMAGE",
}