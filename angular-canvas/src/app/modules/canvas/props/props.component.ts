import { Component, OnInit } from '@angular/core';
import { Subscription, delay, of } from 'rxjs';
import { CanvasService } from 'src/app/services/canvas.service';
import { CreationService } from 'src/app/services/creation.service';
import { EditingService } from 'src/app/services/editing.service';
import { EnumSelectOptions } from 'src/app/utilities/elements';

@Component({
  selector: 'app-props',
  templateUrl: './props.component.html',
  styleUrls: ['./props.component.scss'],
})
export class PropsComponent implements OnInit {
  public get params() {
    if (this._creationService.selection === EnumSelectOptions.HAND) {
      return this._editionService.params;
    } else {
      return this._creationService.params;
    }
  }

  public get paramsType() {
    if (this._creationService.selection == EnumSelectOptions.HAND) {
      return this._editionService.paramsType;
    } else {
      return this._creationService.getParamsType();
    }
  }

  constructor(
    private readonly _creationService: CreationService,
    private readonly _canvasService: CanvasService,
    private readonly _editionService: EditingService
  ) {}

  public onFieldChange(event: Event) {
    let prop = event.target;
    if (prop instanceof HTMLInputElement) {
      const params = this._editionService.params;
      switch (prop.name) {
        case 'name':
        case 'strokeStyle':
        case 'fillStyle':
        case 'value':
          params[prop.name] = prop.value.toString();
          break;
        case 'x':
        case 'y':
        case 'h':
        case 'w':
        case 'x2':
        case 'y2':
        case 'r':
        case 'fontSize':
          params[prop.name] = parseInt(prop.value);
          break;
      }

      this._editionService.useParams(params);
      this._canvasService.render();
    }
  }

  public ngOnInit(): void {
    this._creationService.selectionChange.subscribe(() => {
      if (this._creationService.selection === EnumSelectOptions.HAND) {
        return;
      }
    });
  }

  public onImgSrcClick() {
    this._canvasService.disableClick();
  }

  public onRemoveClick() {
    this._editionService.removeSelectedShapes();
    this._canvasService.render();
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
