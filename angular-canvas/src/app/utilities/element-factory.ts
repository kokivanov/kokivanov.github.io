import {
  Ellipse,
  ImageElem,
  Line,
  Rectangle,
  SelectOptions,
  TextElem,
  Triangle,
} from './elements';
import { ElementBase } from './elements/absstracts';
import {
  IFillShapeParams,
  IImageParams,
  ILineParams,
  ITextParams,
} from './elements/interfaces';

type EB = ElementBase;

export class ElementFactory {
  public static createElement<T extends SelectOptions.RECTANGLE>(
    type: T,
    params: IFillShapeParams
  ): EB;
  public static createElement<T extends SelectOptions.TRIANGLE>(
    type: T,
    params: IFillShapeParams
  ): EB;
  public static createElement<T extends SelectOptions.LINE>(
    type: T,
    params: ILineParams
  ): EB;
  public static createElement<T extends SelectOptions.RECTANGLE>(
    type: T,
    params: IFillShapeParams
  ): EB;
  public static createElement<T extends SelectOptions.IMAGE>(
    type: T,
    params: IImageParams
  ): EB;
  public static createElement<T extends SelectOptions.TEXT>(
    type: T,
    params: ITextParams
  ): EB;
  public static createElement(
    type: SelectOptions,
    params: any | { x: number; y: number; h: number; w: number }
  ): EB;

  public static createElement(
    type = SelectOptions.RECTANGLE,
    params: any = {
      x: 0,
      y: 0,
      h: 100,
      w: 100,
      x2: 100,
      y2: 100,
    }
  ): EB {
    switch (type) {
      case SelectOptions.RECTANGLE:
        return new Rectangle(params);
      case SelectOptions.ELLIPSE:
        return new Ellipse(params);
      case SelectOptions.LINE:
        return new Line(params);
      case SelectOptions.TRIANGLE:
        return new Triangle(params);
      case SelectOptions.TEXT:
        return new TextElem(params);
      case SelectOptions.IMAGE:
        return new ImageElem(params);
      default:
        return new Rectangle(params);
    }
  }
}
