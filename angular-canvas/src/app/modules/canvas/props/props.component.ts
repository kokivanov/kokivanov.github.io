import { Component, OnInit } from '@angular/core';
import { CreationService } from 'src/app/services/creation.service';
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
    return this._creationService.params;
  }

  constructor(private readonly _creationService: CreationService) {}

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

  public onImgSrcChange(event: Event) {
    if (event.target instanceof HTMLInputElement && event.target.files) {
      this._creationService.selectImage(
        URL.createObjectURL(event.target.files[0])
      );
    }
  }
}
