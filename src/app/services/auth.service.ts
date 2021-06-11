import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Subject, Observable } from 'rxjs';
import firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  user = new Subject<firebase.User | null>();
  errorMessage = new Subject<string>();
  isLoading = new Subject<boolean>();

  constructor(private afAuth: AngularFireAuth) { }
  
  ngOnInit() { }

  authenticate(email: string, password: string, isLoginMode: boolean) {
    let authObs: Observable<any>;
    this.isLoading.next(true)

    authObs = isLoginMode
      ? from(this.afAuth.signInWithEmailAndPassword(email, password))
      : from(this.afAuth.createUserWithEmailAndPassword(email, password));

    authObs.subscribe(userCredential => {
      this.user.next(userCredential.user);
      this.isLoading.next(false)
      console.log(this.user);
    }, error => {
      this.errorMessage.next(error.message);
    });
  }
}