import {
  Ellipse,
  ImageElem,
  Line,
  Rectangle,
  TextElem,
  Triangle,
} from '../elements';

export type TypeStylingParams = string | CanvasGradient | CanvasPattern;
export type TypeShape =
  | ImageElem
  | TextElem
  | Line
  | Ellipse
  | Rectangle
  | Triangle;

export enum EnumSelectOptions {
  RECTANGLE = 'RECTANGLE',
  ELLIPSE = 'ELLIPSE',
  LINE = 'LINE',
  TRIANGLE = 'TRIANGLE',
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  HAND = 'HAND',
}
