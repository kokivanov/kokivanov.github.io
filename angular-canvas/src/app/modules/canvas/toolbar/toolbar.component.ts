import { AfterViewInit, Component } from '@angular/core';
import { CanvasService } from 'src/app/services/canvas.service';
import { CreationService } from 'src/app/services/creation.service';
import { SelectOptions } from 'src/app/utilities/elements';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements AfterViewInit {
  public options = SelectOptions;
  public isInitialized: () => boolean = () => false;
  public statuses = {
    [SelectOptions.RECTANGLE]: 'success',
    [SelectOptions.ELLIPSE]: 'basic',
    [SelectOptions.TRIANGLE]: 'basic',
    [SelectOptions.LINE]: 'basic',
    [SelectOptions.IMAGE]: 'basic',
    [SelectOptions.TEXT]: 'basic',
  };

  constructor(
    private readonly _creationService: CreationService,
    private readonly _canvasService: CanvasService
  ) {}

  public onToolSelectClick(_: Event, option: SelectOptions) {
    this.statuses[this._creationService.selection] = 'basic';
    this._creationService.changeSelection(option);
    this.statuses[option] = 'success';
  }

  public onClearClick() {
    this._canvasService.clear();
  }

  public ngAfterViewInit(): void {
    this.isInitialized = () => this._canvasService.isInitialized;
  }
}
