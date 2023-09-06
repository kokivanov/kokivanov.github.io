export interface IBaseParams {
  x?: number;
  y?: number;
  strokeStyle?: string;
  name?: string;
}

export interface IHWParams {
  h?: number;
  w?: number;
}

export interface IFillParams {
  fillStyle?: string;
}

export interface IShapeParams extends IBaseParams, IHWParams {
  r?: number;
}

export interface IFillShapeParams extends IShapeParams, IFillParams {}

export interface ILineParams extends IBaseParams {
  x2?: number;
  y2?: number;
}

export interface ITextParams extends IBaseParams, IFillParams {
  value: string;
  fontSize?: number;
}

export interface IImageParams extends IBaseParams, IHWParams {
  src: string;
}
