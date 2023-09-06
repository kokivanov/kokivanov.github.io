import {
  Ellipse,
  ImageElem,
  Line,
  Rectangle,
  TextElem,
  Triangle,
} from '../elements';

export type stylingParams = string | CanvasGradient | CanvasPattern;
export type Shape =
  | ImageElem
  | TextElem
  | Line
  | Ellipse
  | Rectangle
  | Triangle;

export enum SelectOptions {
  RECTANGLE = 'RECTANGLE',
  ELLIPSE = 'ELLIPSE',
  LINE = 'LINE',
  TRIANGLE = 'TRIANGLE',
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
}

export type Line_t = 'Line';
export type Rectangle_t = 'Rectangle';
export type Ellipse_t = 'Ellipse';
export type Triangle_t = 'Triangle';
