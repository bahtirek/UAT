import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { api } from '../data/api-url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = api.url;
  token: string = "token";
  jwtHelper = new JwtHelperService();
  redirectUrl: string;

  constructor(private http: HttpClient) { }

  getToken() {
    //console.log('gettoken');
    if (this.isLoggedIn()) {
      return this.token;
    } else {
      this.logout();
    }
  }

  isLoggedIn(){
    if(this.token) {
      if (!this.jwtHelper.isTokenExpired(this.token)) return true;
    } else {
      return false
    }
  }

  login(credentials: any){
    return this.http.post<any>(this.url + '/auth/login', credentials)
  }


  setToken(token: string){
    localStorage.setItem('jwtToken', token);
    this.token = token
  }

  getTokenFromLocal(){
    this.token = localStorage.getItem('jwtToken');
    console.log(this.token);

  }

  logout(): void {
    /* const token = localStorage.getItem('triage_user_token');
    localStorage.removeItem('triage_user');
    localStorage.removeItem('triage_user_token');
    this.userObservableSource.next(false);
    this.http.post(this.domain + 'auth/logout?token=' + token, {}).subscribe(
      result=>{},
      error => {
        //console.log(error);
      }
    )
    this.router.navigate(['login']); */
  }
}
