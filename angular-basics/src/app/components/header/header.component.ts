import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() imgUpdate = new EventEmitter(); 

  notifyParent() {
    this.imgUpdate.emit()
  }
}
