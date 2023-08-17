import { BaseParams } from "../../utils/interfaces";
import { stylingParams } from "../../utils/types";

export abstract class ElementBase {
  protected _name: string;
  protected _strokeStyle: stylingParams;
  protected _x: number;
  protected _y: number;
  
  public get name() {
    return this._name
  };
  
  public get strokeStyle() {
    return this._strokeStyle
  }
  
  public set strokeStyle(style: stylingParams) {
    this._strokeStyle = style
  }
  
  public get coords() {
    return {x: this._x, y: this._y}
  }
  
  public set coords({x, y}:{x: number, y:number}) {
    this._x = x;
    this._y = y;
  }

  constructor(params: BaseParams) {
    this._name = params.name || this.constructor.name + "-" + Date.now();
    this.toString = () => this._name;
    this._strokeStyle = params.strokeStyle || "black";
    this._x = params.x || 0;
    this._y = params.y || 0;
  }
  
  abstract draw(ctx: CanvasRenderingContext2D) : void;
  abstract drawTry(ctx: CanvasRenderingContext2D) : void;
  
}