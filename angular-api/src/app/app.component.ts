import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'angular-api';

  constructor(private readonly _authService: AuthService) {
    this._authService.setApiKey('1a6962fb7040c9d8f0a3eda7b3b8f75a604dc0c6');
  }
}
