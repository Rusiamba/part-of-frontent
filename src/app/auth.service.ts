import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http'; 
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: any;
  user: any;

  constructor(private http: Http) { }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/account/reg', 
    user, 
    {headers: headers}).pipe(map((response: any) => response.json()));
  }


  authUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/account/auth', 
    user, 
    {headers: headers}).pipe(map((response: any) => response.json()));
  }
}