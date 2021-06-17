import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/Models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email= '';
  password= '';
  public isLoginClient = false;
  public isLogin = false;
  constructor(
    public authService: AuthService,
    public router: Router,
    public afs: AngularFirestore,
    public user: UserInterface
  ) { }

  ngOnInit(): void {
  }
  onSubmitLogin(){
    this.authService.login(this.email, this.password).then(
      (resolve) => {
        this.onLoginRedirect(this.email)
        console.log(resolve)
      }).catch((err) => {
        this.router.navigate(['/login']);
        alert('Ocurrio un error')
        console.log(err)
      })
  }
  onLoginRedirect(id:string){
    this.authService.getAuth().subscribe(user => {
      if(user){
        this.isLogin = true;
        this.authService.getUserData(id).subscribe( (info: UserInterface | any) =>
        {
          if(info.employee){
            this.isLoginClient = false;
          }
        })
      }
    }) 
  }
}
