import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/Models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private router: Router,
    private authsService: AuthService
  ) { };
  password= '';
  type='';
  id= '';
  names= '';
  lastname= '';
  email= '';
  employee= false;
  curp= '';
  accounts?: string[]
  address?: string
  cp?: string

  ngOnInit(): void {
  }
  
   addNewUser(){
    this.authsService.registerUser(this.email,this.password)
  } 

}
