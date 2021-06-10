import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  
  constructor(private authService: AuthService) { }

  toggleIsLoginMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    const { email, password } = form.value;

    this.isLoginMode 
      ? console.log('Logging in') 
      : this._signUp(email, password);

    form.reset();
  }

  private _signUp(email: string, password: string) {
    return this.authService.signup(email, password)
      .subscribe(resData => {
        console.log(resData)
      }, error => {
        console.log(error)
      });
  }
}