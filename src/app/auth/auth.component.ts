import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import firebase from 'firebase/app';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  errorMessage: string = '';
  user: firebase.User | null;

  subscription = new Subscription();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.subscription.add(this.authService.user
      .subscribe((user: firebase.User | null) => this.user = user));
    this.subscription.add(this.authService.errorMessage
      .subscribe((errorMessage: string) => this.errorMessage = errorMessage));
    this.subscription.add(this.authService.isLoading
      .subscribe((isLoading: boolean) => this.isLoading = isLoading));
  }

  toggleIsLoginMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) { return; }
    const { email, password } = form.value;
    
    this.authService.authenticate(email, password, this.isLoginMode);

    form.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onHandleError() {
    this.errorMessage = '';
  }
}