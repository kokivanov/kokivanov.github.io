import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public get username() {
    return this._authService.profile?.username;
  }

  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {}

  public isLoggedIn() {
    return this._authService.isAuthorized;
  }

  public onLogoutClick() {
    this._authService.logout();
    this._router.navigateByUrl('/auth');
  }
}
