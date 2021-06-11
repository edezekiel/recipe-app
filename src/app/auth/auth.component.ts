import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  errorMessage: string = '';

  constructor(private authService: AuthService) { }

  toggleIsLoginMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const { email, password } = form.value;

    this.isLoading = true;

    this.isLoginMode 
      ? this._signIn(email, password)
      : this._signUp(email, password);

    form.reset();
  }

  private _signUp(email: string, password: string) {
    return this.authService.signUp(email, password)
      .subscribe(userCredential => {
        console.log(userCredential);
        this.isLoading = false;
      }, error => {
        this.errorMessage = error.message;
        this.isLoading = false;
      });
  }

  private _signIn(email: string, password: string) {
    return this.authService.signIn(email, password)
      .subscribe(userCredential => {
        console.log(userCredential);
        this.isLoading = false;
      }, error => {
        this.errorMessage = error.message;
        this.isLoading = false;
      });
  }
}