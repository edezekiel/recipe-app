import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
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
    let authObs: Observable<any>;
    
    this.isLoading = true;

    authObs = this.isLoginMode 
      ? this.authService.signIn(email, password)
      : this.authService.signUp(email, password)
 
    authObs.subscribe(userCredential => {
        console.log(userCredential);
        this.isLoading = false;
      }, error => {
        this.errorMessage = error.message;
        this.isLoading = false;
      });

    form.reset();
  }
}