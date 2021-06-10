import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }
  
  signup(email: string, password: string) {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password));
  }
}