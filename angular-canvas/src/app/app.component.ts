import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'angular-canvas';

  constructor(private readonly _authService: AuthService) {}

  public ngOnInit(): void {
    this._authService.restoreFromStorage();
  }
}
