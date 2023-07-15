import { Component, OnInit } from '@angular/core';
//importing Users model and Users service
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/Services/users.Service';
//importing FormBuilder and validators for reactive form
import { FormBuilder, Validators } from '@angular/forms';
//Importing ToasterService for popups
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user!: Users;
  allUsers: Users[] = [];

  data?:boolean;

  constructor(private fb: FormBuilder,
    private _Users: UsersService,
    private toastr: ToastrService,
    private router: Router) {
  }

  //Reactive ADD User Form
  LoginForm = this.fb.group({
    Email: ['', [Validators.required,Validators.email] ],
    Password: ['', [Validators.required,
      Validators.minLength(8),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'),]],
  })

  //Setters
  get Email() { return this.LoginForm.get('Email'); }
  get Password() { return this.LoginForm.get('Password'); }



  //Login
  login() {
    this.user=this.LoginForm.value as Users;
    this._Users.login(this.user).subscribe((res) => 
    {
      if(res.success){
        localStorage.setItem('token',res.token);
        this._Users.updateBoolean(true);
        this.router.navigate(['pages/home']);

      }else{
        console.log(res.message);
        this.toastr.error('Login Failed');
      }
    }, err => {
      console.log("Failed to get users from database",err);
    })
  }
  
  ngOnInit()
  {
    this._Users.data$.subscribe((newData: boolean) => {
      this.data = newData;
    });
  }
}


