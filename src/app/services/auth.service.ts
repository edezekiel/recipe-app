import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject, BehaviorSubject } from 'rxjs';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  user = new BehaviorSubject<firebase.User | null>(null);
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
        this.isLoading.next(false);
        this.router.navigate(['/recipes']);
      })
      .catch(error => {
        this.errorMessage.next(error.message);
        this.isLoading.next(false);
      }
    );
  }
}