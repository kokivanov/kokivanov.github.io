import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router
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
      this.authForm.get('username')?.disable();
      this.authForm.get('password')?.disable();
      this.toggleForm();
      this._authService
        .login(this.authForm.value.username, this.authForm.value.password)
        .subscribe((v) => {
          alert('Welcome, ' + v.firstName + '!');
          this._router.navigate(['/']);
        });
    }
  }
}
