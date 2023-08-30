import { Component } from '@angular/core';
import { MessagesService } from './services/messages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [],
})
export class AppComponent {
  constructor(private readonly messagesService: MessagesService) {}

  public readonly title = 'angular-tour-of-heroes';

  public onToggleClick() {
    this.messagesService.toggleActive();
  }
}
