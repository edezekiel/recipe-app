import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject, BehaviorSubject } from 'rxjs';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { take, exhaustMap } from 'rxjs/operators';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  user = new BehaviorSubject<firebase.User | null>(null);
  _user: firebase.User | null = null;
  token = new BehaviorSubject<string>('');
  errorMessage = new Subject<string>();
  isLoading = new Subject<boolean>();

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
    ) { }
  
  ngOnInit() { }

  authenticate(email: string, password: string, isLoginMode: boolean) {
    this.isLoading.next(true)

    const promise = isLoginMode
      ? this.afAuth.signInWithEmailAndPassword(email, password)
      : this.afAuth.createUserWithEmailAndPassword(email, password);

    promise.then(userCredential => {
        this.user.next(userCredential.user);
        this._user = userCredential.user;
        localStorage.setItem('userData', JSON.stringify(this._user));
        this._getUserToken();
      })
      .catch(error => {
        this.errorMessage.next(error.message);
        this.isLoading.next(false);
      }
    );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
  }

  autoLogin() {
    const userData = localStorage.getItem('userData');
    const userToken = localStorage.getItem('userToken');

    if (!userData || !userToken) {
      return;
    } else {
      this.user.next(JSON.parse(userData));
      this.token.next(JSON.parse(userToken));
    }
  }

  _getUserToken() {
    if (this._user) {
      this._user.getIdToken(true).then(token => {
        this.token.next(token);
        localStorage.setItem('userToken', JSON.stringify(token));
        this.isLoading.next(false);
        this.router.navigate(['/recipes']);
      });
    }
  }
}