import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Users } from '../models/users';
import { BASE_URL } from './URL';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  //To get login status from Login Component
  private booleanStatus = new BehaviorSubject<boolean>(false);
  public data$ = this.booleanStatus.asObservable();

  mystatus: boolean = false;

  private _url: string = BASE_URL;

  constructor(private http: HttpClient) { }


  //Sign up new User
  signup(user: Users): Observable<any> {
    return this.http.post<Users[]>(this._url + 'register/', user);
  }

  //Login  User
  login(user: Users): Observable<any> {
    return this.http.post<Users[]>(this._url + 'login/', user);
  }

  //Getting User Profile
  getProfile():Observable<any> {
    const headers = {
      'Authorization': "Bearer " + localStorage.getItem('token'),
    }
    return this.http.get(this._url + 'profile/', { headers: headers });
  }

  

//FOR AUTH GUARD
  //update status
  updateBoolean(value: boolean): void {
    this.booleanStatus.next(value);
    this.mystatus = value;
  }


  //CanActivate Authentication function
  isAuthenticated() {
    if (this.mystatus == true) {
      return true;
    }
    else {
      return false;
    }
  }


}
