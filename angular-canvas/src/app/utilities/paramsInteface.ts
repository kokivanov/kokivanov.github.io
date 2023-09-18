import { stylingParams } from './elements';

export interface IParams {
  x: number | null;
  y: number | null;
  strokeStyle: stylingParams;
  name: string;
  h: number | null;
  w: number | null;
  fillStyle: stylingParams | null;
  r: number | null;
  x2: number | null;
  y2: number | null;
  value: string;
  fontSize: number | null;
  src: string;
}
