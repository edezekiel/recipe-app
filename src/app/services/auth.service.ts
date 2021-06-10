import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }
  
  signup(email: string, password: string) {
    const signupPromise = this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => userCredential)
      .catch((error) => error);
    return from(signupPromise);
  }
}