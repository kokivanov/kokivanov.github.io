import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
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
  private _currentSelection?: HTMLButtonElement;
  public isInitialized: () => boolean = () => false;
  @ViewChild('defaultSelection')
  public defaultSelection!: ElementRef<HTMLButtonElement>;

  constructor(
    private readonly _creationService: CreationService,
    private readonly _canvasService: CanvasService
  ) {}

  public onToolSelectClick(event: Event, option: SelectOptions) {
    this._creationService.changeSelection(option);
    let target: HTMLButtonElement;
    if (event.target instanceof HTMLButtonElement && (target = event.target)) {
      this._currentSelection?.classList.remove('selected');
      target.classList.add('selected');
      this._currentSelection = target;
    }
  }

  public onClearClick() {
    this._canvasService.clear();
  }

  public ngAfterViewInit(): void {
    this.isInitialized = () => this._canvasService.isInitialized;
    this._currentSelection = this.defaultSelection.nativeElement;
  }
}
