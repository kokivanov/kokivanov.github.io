export interface BaseParams {
  x?: number;
  y?: number;
  strokeStyle?: string;
  name?: string;
}

export interface HWParams {
  h?: number;
  w?: number;
}

export interface FillParams {
  fillStyle?: string;
}

export interface ShapeParams extends BaseParams, HWParams {
  r?: number;
}

export interface FillShapeParams extends ShapeParams, FillParams {
}

export interface LineParams extends BaseParams {
  x2?: number;
  y2?: number;
}

export interface TextParams extends BaseParams, FillParams {
  value: string;
  fontSize?: number;
}

export interface ImageParams extends BaseParams, HWParams {
  src: string;
}