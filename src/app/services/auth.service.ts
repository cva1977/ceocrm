import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { FirestoreService } from './firestore/firestore.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public angularFireAuth: AngularFireAuth,
    public router: Router,
    public _firestore: FirestoreService
  ) {
    this.getestado();
  }

  getestado(){

    this.angularFireAuth.authState.subscribe(userResponse => {
      if (userResponse && userResponse.isAnonymous == false) {
        localStorage.setItem('user', JSON.stringify(userResponse));
        
        this._firestore.getUsuarios_cla(userResponse.email).subscribe((resp:any)=>{
          if (resp){
            localStorage.setItem('user_perfil', JSON.stringify(resp.payload.data()));
          }
         });
      /*   let perfil=this.isUserLoggedInPerfil();
         if(perfil.NIVEL_ACCESO==1){
           this.logout();
           this.router.navigate([`/home`]);
         }
*/
      } else {
        localStorage.setItem('user', null);
     
      }
    })

  }

  async login(email: string, password: string) {
    return await this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  async register(email: string, password: string) {
    return await this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
  }

  async sendEmailVerification() {
    return await this.angularFireAuth.auth.currentUser.sendEmailVerification();
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.angularFireAuth.auth.sendPasswordResetEmail(passwordResetEmail);
  }

  async logout() {
    return await this.angularFireAuth.auth.signOut();
  }


  isUserLoggedIn() {
    return JSON.parse(localStorage.getItem('user'));
  }
  

  isUserLoggedInPerfil() {
    return JSON.parse(localStorage.getItem('user_perfil'));
  }

  async  loginWithGoogle() {
    return await this.angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
     
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });;
  }
  signInAnonymously(){
    let user = this.isUserLoggedIn();
    if(user){return;}
    auth().signInAnonymously().catch(function(error){
    })
  }
  logOutAnonymously(){
    let user = this.isUserLoggedIn();
    if(user.isAnonymous){
      this.logout();
    }
  }


}
