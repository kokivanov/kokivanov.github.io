import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { CanvasService } from 'src/app/services/canvas.service';
import { CreationService } from 'src/app/services/creation.service';
import { EditingService } from 'src/app/services/editing.service';
import { EnumSelectOptions } from 'src/app/utilities/elements';
import { deepEqual } from 'src/app/utilities/objEqual';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') public canvas!: ElementRef<HTMLCanvasElement>;
  private _$dragNDrop!: Observable<Event>;
  private _$resize = new Subscription();
  private _$mouseMoveSub = new Subscription();
  public mouseX = 0;
  public mouseY = 0;

  private _startPoint!: { x: number; y: number };
  private _endPoint!: { x: number; y: number };

  constructor(
    private readonly _canvasService: CanvasService,
    private readonly _creationService: CreationService,
    private readonly _toastrService: NbToastrService,
    private readonly _editindService: EditingService
  ) {}

  public ngAfterViewInit(): void {
    this._canvasService.init(this.canvas.nativeElement);
    this._$dragNDrop = fromEvent(this.canvas.nativeElement, 'mousemove');
    this._$resize = fromEvent(window, 'resize').subscribe(() => {
      this._canvasService.render();
    });
  }
  public ngOnDestroy(): void {
    this._canvasService.uninit();
    this._$resize.unsubscribe();
  }

  private setParams() {
    this._creationService.setParams({
      x: this._startPoint.x,
      y: this._startPoint.y,
      x2: this._endPoint.x,
      y2: this._endPoint.y,
      h: this._endPoint.y - this._startPoint.y,
      w: this._endPoint.x - this._startPoint.x,
      fontSize: Math.abs(this._endPoint.y - this._startPoint.y),
    });
  }

  public onMouseDown(event: Event) {
    if (event instanceof MouseEvent) {
      this._startPoint = { x: event.offsetX, y: event.offsetY };
    }

    if (this._creationService.selection === EnumSelectOptions.HAND) {
      this._editindService.selectShape();
      let isPrepared = false;
      let previous_coords = this._startPoint;
      this._$mouseMoveSub = this._$dragNDrop.subscribe({
        next: (e) => {
          e.preventDefault();
          if (!isPrepared) {
            this._editindService.prepareMove();
            isPrepared = true;
          }

          if (e instanceof MouseEvent) {
            const [dx, dy] = [
              e.offsetX - previous_coords.x,
              e.offsetY - previous_coords.y,
            ];

            previous_coords = { x: e.offsetX, y: e.offsetY };
            this._editindService.moveShapes(dx, dy);
          }
        },
      });
    } else {
      this._$mouseMoveSub = this._$dragNDrop.subscribe({
        next: (e) => {
          e.preventDefault();
          if (e instanceof MouseEvent) {
            this._endPoint = { x: e.offsetX, y: e.offsetY };
            this._canvasService.renderPreviw(
              this._creationService.selection,
              this._creationService.params
            );
          }

          this.setParams();
        },
      });
    }
  }

  public onMouseUp(event: Event) {
    if (this._canvasService.lockCanvas) {
      this._canvasService.enableClick();
      return;
    }
    try {
      if (this._creationService.selection === EnumSelectOptions.HAND) {
        this._editindService.commitMovement();
        this._$mouseMoveSub.unsubscribe();
      } else {
        if (event instanceof MouseEvent) {
          this._endPoint = { x: event.offsetX, y: event.offsetY };
        }
        this._$mouseMoveSub.unsubscribe();
        if (deepEqual(this._startPoint, this._endPoint)) {
          this._creationService.params.x = this._startPoint.x;
          this._creationService.params.y = this._startPoint.y;
          this._creationService.addAuto();
        } else {
          this._creationService.addShape();
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        this._toastrService.warning(err.message, 'An error occured!');
      }
    }
  }

  public onMouseMove(event: Event) {
    if (this._creationService.selection === EnumSelectOptions.HAND) {
      if (event instanceof MouseEvent) {
        [this.mouseX, this.mouseY] = [event.offsetX, event.offsetY];
      }
      this._editindService.hoverShape(this.mouseX, this.mouseY);
    }
  }
}
