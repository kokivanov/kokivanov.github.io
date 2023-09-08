import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { CanvasService } from 'src/app/services/canvas.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') public canvas!: ElementRef<HTMLCanvasElement>;
  public mouseX = 0;
  public mouseY = 0;

  constructor(private readonly _canvasService: CanvasService) {}

  public ngAfterViewInit(): void {
    this._canvasService.init(this.canvas.nativeElement);
  }
  public ngOnDestroy(): void {
    this._canvasService.uninit();
  }
  public onMouseMove(event: Event) {
    if (event instanceof MouseEvent) {
      [this.mouseX, this.mouseY] = [event.x, event.y];
    }
  }
}
