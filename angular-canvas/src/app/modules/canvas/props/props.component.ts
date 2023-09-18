import { Component, OnInit } from '@angular/core';
import { Subscription, delay, of } from 'rxjs';
import { CanvasService } from 'src/app/services/canvas.service';
import { CreationService } from 'src/app/services/creation.service';
import { EditingService } from 'src/app/services/editing.service';
import { SelectOptions } from 'src/app/utilities/elements';

@Component({
  selector: 'app-props',
  templateUrl: './props.component.html',
  styleUrls: ['./props.component.scss'],
})
export class PropsComponent implements OnInit {
  // public params: IParams = {
  //   x: 100,
  //   y: 100,
  //   strokeStyle: '#000000',
  //   name: 'Shape-1',
  //   h: 100,
  //   w: 100,
  //   fillStyle: '#FF0000',
  //   r: 0,
  //   x2: 200,
  //   y2: 200,
  //   value: 'Hello world!',
  //   fontSize: 14,
  //   src: '',
  // };
  public paramsType = 'fillParams';
  public get params() {
    if (this._creationService.selection === SelectOptions.HAND) {
      return this._editionService.params;
    } else {
      return this._creationService.params;
    }
  }

  constructor(
    private readonly _creationService: CreationService,
    private readonly _canvasService: CanvasService,
    private readonly _editionService: EditingService
  ) {}

  public ngOnInit(): void {
    this._creationService.selectionChange.subscribe({
      next: () => {
        if (
          this._creationService.selection == SelectOptions.RECTANGLE ||
          this._creationService.selection == SelectOptions.TRIANGLE ||
          this._creationService.selection == SelectOptions.ELLIPSE
        ) {
          this.paramsType = 'fillParams';
        } else if (this._creationService.selection == SelectOptions.LINE) {
          this.paramsType = 'lineParams';
        } else if (this._creationService.selection == SelectOptions.IMAGE) {
          this.paramsType = 'imageParams';
        } else if (this._creationService.selection == SelectOptions.TEXT) {
          this.paramsType = 'textParams';
        }
      },
    });
  }

  public onImgSrcClick() {
    this._canvasService.disableClick();
  }

  public onImgSrcChange(event: Event) {
    if (
      event.target instanceof HTMLInputElement &&
      event.target.files &&
      event.target.files.length > 0
    ) {
      this._creationService.selectImage(
        URL.createObjectURL(event.target.files[0])
      );
      const sub$ = new Subscription();
      sub$.add(
        of(null)
          .pipe(delay(300))
          .subscribe(() => {
            this._canvasService.enableClick();
            sub$.unsubscribe();
          })
      );
    }
  }
}
