import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router,
    private readonly _toast: NbToastrService
  ) {}

  public authForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  private _lockForm = false;
  public get lockForm() {
    return this._lockForm;
  }

  public toggleForm() {
    this._lockForm = !this._lockForm;
  }

  public onLoginClick() {
    console.log(this.authForm.value);
    if (this.authForm.value.username && this.authForm.value.password) {
      this.toggleForm();
      this._authService
        .login(this.authForm.value.username, this.authForm.value.password)
        .subscribe({
          next: (v) => {
            this.toggleForm();
            this._router.navigate(['/']);
            this._toast.info('Welcome, ' + v.firstName + '!', 'Logged in!', {
              duration: 2000,
            });
          },
          error: () => {
            this.toggleForm();
            this._toast.danger(
              "User with such username and password wasn't found",
              'Log in failed',
              { duration: 6000 }
            );
          },
        });
    }
  }
}
