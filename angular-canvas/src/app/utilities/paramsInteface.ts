import { TypeStylingParams } from './elements';

export interface IParams {
  x: number | null;
  y: number | null;
  strokeStyle: TypeStylingParams;
  name: string;
  h: number | null;
  w: number | null;
  fillStyle: TypeStylingParams | null;
  r: number | null;
  x2: number | null;
  y2: number | null;
  value: string;
  fontSize: number | null;
  src: string;
}
