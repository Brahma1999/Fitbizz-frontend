import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//importing Users model and Users service
import { UsersService } from 'src/app/Services/users.Service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  data:any=[];
  constructor(private router: Router,private _users:UsersService){
  }

  ngOnInit(): void {
    this.getProfile();
   }

  getProfile(){
    this._users.getProfile().subscribe(res=>{
      if(res.success){
        console.log(res.data);
        this.data=res.data;
        
      }
    })
  }


  logout(){
    localStorage.clear();
    this.router.navigate(['']);
   }

  
   
}
