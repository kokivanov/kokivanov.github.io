import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ElementFactory } from '../utilities/element-factory';
import { SelectOptions } from '../utilities/elements';
import { CanvasService } from './canvas.service';

@Injectable({
  providedIn: 'root',
})
export class CreationService {
  private _selection: string = SelectOptions.RECTANGLE;

  private _textValue = '';
  private _imgSrc = '';

  private _selectionChange = new Subject<string>();
  public get selectionChange() {
    return this._selectionChange.asObservable();
  }

  public get selection() {
    return this._selection;
  }

  constructor(private readonly canvasService: CanvasService) {}

  private selectionToElement<
    T extends
      | SelectOptions.RECTANGLE
      | SelectOptions.ELLIPSE
      | SelectOptions.IMAGE
      | SelectOptions.TEXT
      | SelectOptions.TRIANGLE
      | SelectOptions.LINE
  >(type: T, params: any) {
    return ElementFactory.createElement(type, params);
  }

  public addAuto(
    type: SelectOptions,
    x: number,
    y: number,
    h?: number,
    w?: number
  ) {
    const elem = this.selectionToElement(type, { x, y, h, w });
    if (elem) {
      this.canvasService.addElement(elem);
    }
  }

  //FIXME: Input image and text through parameters, better rewrite
  public changeSelection(option: SelectOptions = SelectOptions.RECTANGLE) {
    if (option !== this._selection) {
      if (option === SelectOptions.TEXT) {
        const input = prompt('Eneter text', this._textValue) || '';
        if (input) {
          this._textValue = input;
          this._selection = option;
        } else {
          alert('Cant render empty string');
        }
      } else if (option === SelectOptions.IMAGE) {
        const inputElement = document.getElementById('img-input');

        if (!(inputElement instanceof HTMLInputElement)) {
          throw TypeError('Must provide input element');
        }
        inputElement.click.apply(inputElement);

        inputElement.addEventListener('change', () => {
          if (inputElement.files && inputElement.files.length > 0) {
            const imgSrc = inputElement.files[0];
            if (imgSrc) {
              this._imgSrc = URL.createObjectURL(imgSrc);
              this._selection = option;
              this._selectionChange.next(this._selection);
            } else {
              alert('No image was selected');
            }
          } else {
            alert('No image was selected');
            this._selection = SelectOptions.RECTANGLE;
            this._selectionChange.next(this._selection);
            const rectButton = document.getElementById('rectangle-button');
            if (rectButton) {
              rectButton.click.apply(rectButton);
            }
          }
        });
      } else {
        this._selection = option;
      }

      this._selectionChange.next(this._selection);
    }
  }
}
