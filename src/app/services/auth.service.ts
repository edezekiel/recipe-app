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
        this._getUserToken();
      })
      .catch(error => {
        this.errorMessage.next(error.message);
        this.isLoading.next(false);
      }
    );
  }

  _getUserToken() {
    if (this._user) {
      this._user.getIdToken(true).then(token => {
        console.log('_getUserToken = ', token);
        this.token.next(token);
        this.isLoading.next(false);
        this.router.navigate(['/recipes']);
      });
    }
  }
}