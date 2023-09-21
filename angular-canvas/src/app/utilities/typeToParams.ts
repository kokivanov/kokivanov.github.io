import {
  Ellipse,
  EnumSelectOptions,
  ImageElem,
  Line,
  TextElem,
  Triangle,
} from './elements';
import { ElementBase } from './elements/absstracts';

export function typeToParams(elem: ElementBase) {
  if (elem instanceof TextElem) {
    return 'textParams';
  } else if (elem instanceof ImageElem) {
    return 'imageParams';
  } else if (elem instanceof Line) {
    return 'lineParams';
  } else {
    return 'fillParams';
  }
}

export function typeToEnum(elem: ElementBase) {
  if (elem instanceof Triangle) {
    return EnumSelectOptions.TRIANGLE;
  } else if (elem instanceof Ellipse) {
    return EnumSelectOptions.ELLIPSE;
  } else if (elem instanceof TextElem) {
    return EnumSelectOptions.TEXT;
  } else if (elem instanceof ImageElem) {
    return EnumSelectOptions.IMAGE;
  } else if (elem instanceof Line) {
    return EnumSelectOptions.LINE;
  } else {
    return EnumSelectOptions.RECTANGLE;
  }
}
