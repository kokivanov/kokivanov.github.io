import {
  Ellipse,
  EnumSelectOptions,
  ImageElem,
  Line,
  Rectangle,
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
  public static createElement<T extends EnumSelectOptions.RECTANGLE>(
    type: T,
    params: IFillShapeParams
  ): EB;
  public static createElement<T extends EnumSelectOptions.TRIANGLE>(
    type: T,
    params: IFillShapeParams
  ): EB;
  public static createElement<T extends EnumSelectOptions.LINE>(
    type: T,
    params: ILineParams
  ): EB;
  public static createElement<T extends EnumSelectOptions.RECTANGLE>(
    type: T,
    params: IFillShapeParams
  ): EB;
  public static createElement<T extends EnumSelectOptions.IMAGE>(
    type: T,
    params: IImageParams
  ): EB;
  public static createElement<T extends EnumSelectOptions.TEXT>(
    type: T,
    params: ITextParams
  ): EB;
  public static createElement(
    type: EnumSelectOptions,
    params: any | { x: number; y: number; h: number; w: number }
  ): EB;

  public static createElement(
    type = EnumSelectOptions.RECTANGLE,
    params: any = {
      x: 0,
      y: 0,
      h: 100,
      w: 100,
      x2: 100,
      y2: 100,
      src: '',
    }
  ): EB {
    switch (type) {
      case EnumSelectOptions.RECTANGLE:
        return new Rectangle(params);
      case EnumSelectOptions.ELLIPSE:
        if (params.w < 0) {
          params.x = params.x + params.w;
          params.w = Math.abs(params.w);
        }
        if (params.h < 0) {
          params.y = params.y + params.h;
          params.h = Math.abs(params.h);
        }
        return new Ellipse(params);
      case EnumSelectOptions.LINE:
        return new Line(params);
      case EnumSelectOptions.TRIANGLE:
        return new Triangle(params);
      case EnumSelectOptions.TEXT:
        return new TextElem(params);
      case EnumSelectOptions.IMAGE:
        if (params.src === '') {
          throw new Error('No image selected');
        } else {
          return new ImageElem(params);
        }
      default:
        return new Rectangle(params);
    }
  }
}
