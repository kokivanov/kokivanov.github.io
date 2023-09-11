import { Component } from '@angular/core';
import { CreationService } from 'src/app/services/creation.service';

@Component({
  selector: 'app-props',
  templateUrl: './props.component.html',
  styleUrls: ['./props.component.scss'],
})
export class PropsComponent {
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

  public imgSrc!: File;
  public paramsType = 'fillParams';
  public get params() {
    return this._creationService.params;
  }

  constructor(private readonly _creationService: CreationService) {}
}
