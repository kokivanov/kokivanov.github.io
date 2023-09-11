import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { CanvasService } from 'src/app/services/canvas.service';
import { CreationService } from 'src/app/services/creation.service';
import { SelectOptions } from 'src/app/utilities/elements';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') public canvas!: ElementRef<HTMLCanvasElement>;
  private _$dragNDrop!: Observable<Event>;
  private _$mouseMoveSub = new Subscription();
  public mouseX = 0;
  public mouseY = 0;

  private _startPoint!: { x: number; y: number };
  private _endPoint!: { x: number; y: number };

  constructor(
    private readonly _canvasService: CanvasService,
    private readonly _creationService: CreationService
  ) {}

  public ngAfterViewInit(): void {
    this._canvasService.init(this.canvas.nativeElement);
    this._$dragNDrop = fromEvent(this.canvas.nativeElement, 'mousemove');
  }
  public ngOnDestroy(): void {
    this._canvasService.uninit();
  }

  public onMouseDown(event: Event) {
    if (event instanceof MouseEvent) {
      this._startPoint = { x: event.offsetX, y: event.offsetY };
    }

    this._$mouseMoveSub = this._$dragNDrop.subscribe({
      next: (e) => {
        e.preventDefault();
        if (e instanceof MouseEvent) {
          this._endPoint = { x: e.offsetX, y: e.offsetY };
          this._canvasService.renderPreviw(
            this._creationService.selection as SelectOptions,
            this._startPoint.x,
            this._startPoint.y,
            this._endPoint.y - this._startPoint.y,
            this._endPoint.x - this._startPoint.x
          );
        }
        this._creationService.params.x = this._startPoint.x;
        this._creationService.params.y = this._startPoint.y;
        this._creationService.params.x2 = this._endPoint.x;
        this._creationService.params.y2 = this._endPoint.y;
        this._creationService.params.h = this._endPoint.y - this._startPoint.y;
        this._creationService.params.w = this._endPoint.x - this._startPoint.x;
      },
    });
  }
  public onMouseUp() {
    this._$mouseMoveSub.unsubscribe();
    console.log(this._startPoint, this._endPoint);
  }

  public onMouseMove(event: Event) {
    if (event instanceof MouseEvent) {
      [this.mouseX, this.mouseY] = [event.offsetX, event.offsetY];
    }
  }
}
