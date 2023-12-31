import { Component, Input } from '@angular/core';
import { IItem } from 'src/app/entities/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input() public item!: IItem;
}
