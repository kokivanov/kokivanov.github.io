import { Component, Input } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.sass']
})
export class MessagesComponent {
  @Input() public returnUrl! : string;

  constructor(public messagesService : MessagesService) {}
}
