import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  storageKey: string = 'contact-manager-jwt'
  connectedUser: string = 'connected-user'

  constructor(private router: Router) { }

  setToken(data){
    localStorage.setItem(this.storageKey, data.token);
    localStorage.setItem(this.connectedUser, JSON.stringify(data.user));
  }

  getToken(){
    return localStorage.getItem(this.storageKey);
  }

  isLoggedIn(){
    return this.getToken() !== null;
  }

  isAdmin(){
    if(localStorage.getItem(this.connectedUser)){
      var user = localStorage.getItem(this.connectedUser);
      return JSON.parse(user).admin;
    }

  }

  logout(){
    localStorage.removeItem(this.storageKey);
    this.router.navigate(['/login']);
  }

}
