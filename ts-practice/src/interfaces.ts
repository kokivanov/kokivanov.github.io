export interface BaseParams {
  x?: number;
  y?: number;
  strokeStyle?: string;
  name?: string;
}

export interface HYParams {
  h?: number;
  w?: number;
}

export interface FillParams {
  fillStyle?: string;
}

export interface ShapeParams extends BaseParams, HYParams, FillParams {
  r?: number;
}

export interface LineParams extends BaseParams, HYParams {
  x2?: number;
  y2?: number;
}

export interface TextParams extends BaseParams, FillParams {
  value: string;
  fontSize: number;
}

export interface ImageParams extends BaseParams, HYParams {
  src: string;
}