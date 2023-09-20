import { AfterViewInit, Component } from '@angular/core';
import { CanvasService } from 'src/app/services/canvas.service';
import { CreationService } from 'src/app/services/creation.service';
import { EnumSelectOptions } from 'src/app/utilities/elements';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements AfterViewInit {
  public options = EnumSelectOptions;
  public isInitialized: () => boolean = () => false;
  public statuses = {
    [EnumSelectOptions.RECTANGLE]: 'basic',
    [EnumSelectOptions.ELLIPSE]: 'basic',
    [EnumSelectOptions.TRIANGLE]: 'basic',
    [EnumSelectOptions.LINE]: 'basic',
    [EnumSelectOptions.IMAGE]: 'basic',
    [EnumSelectOptions.TEXT]: 'basic',
    [EnumSelectOptions.HAND]: 'success',
  };

  constructor(
    private readonly _creationService: CreationService,
    private readonly _canvasService: CanvasService
  ) {}

  public onToolSelectClick(_: Event, option: EnumSelectOptions) {
    this.statuses[this._creationService.selection] = 'basic';
    this._creationService.changeSelection(option);
    this.statuses[option] = 'success';

    if (this._canvasService.canvas) {
      if (this._creationService.selection === EnumSelectOptions.HAND) {
        this._canvasService.canvas.style.cursor = 'grab';
      } else {
        this._canvasService.canvas.style.cursor = 'crosshair';
      }
    }
  }

  public onClearClick() {
    this._canvasService.clear();
  }

  public ngAfterViewInit(): void {
    this.isInitialized = () => this._canvasService.isInitialized;
  }
}
