import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserInterface } from '../Models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    public user: Observable<firebase.default.User | null>,
    public registerCollection: AngularFirestoreCollection<UserInterface>,
    public registerDoc: AngularFirestoreDocument<UserInterface>,
    public register: Observable<UserInterface[]>
  ) {
    this.user = afAuth.authState;
    this.registerCollection = this.afs.collection('Register', ref => ref); 
   }
   //Registra Usuario en FirebaseAuth (correo/contraseña)
   registerUser(email:string, pass:string){
     return new Promise((resolve, reject) => {
       this.afAuth.createUserWithEmailAndPassword(email,pass).then(
         userData => resolve(userData), 
         err => reject(err));
     })
   }
   //Registra usuario en Firestore
   addUser(registerData: UserInterface){
     this.registerCollection.doc(registerData.id).set(registerData);
   }
   //Elimina Usuario de Firetore
   deleteUser(registerData: UserInterface){
     this.registerDoc = this.afs.doc('Register/' + registerData.id);
     this.registerDoc.delete();
     this.afAuth.signOut;     
   }
   //Actualizar Usuario
   updateUser(registerData: UserInterface){
     this.registerDoc = this.afs.doc('Register/' + registerData.id);
     this.registerDoc.update(registerData);
   }
   //Metodo Login
   login(email:string, pass:string){
     return new Promise((resolve, reject) => {
       this.afAuth.signInWithEmailAndPassword(email,pass).then(
         userData => resolve(userData),
         err => reject(err));
    });
  }
  //Metodo Logout
  logout() {
    return this.afAuth.signOut();
  }
  //Verificar estado
  getAuth(){
    return this.afAuth.authState.pipe(map(auth => auth));
  }
  //Validar información de usuario
  getUserData(id: string){
    return this.registerCollection.doc(id).valueChanges();
  }
}
