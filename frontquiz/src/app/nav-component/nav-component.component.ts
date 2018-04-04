import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/service/auth.service';



@Component({
  selector: 'nav-top',
  template: `
    <mat-toolbar color="primary" *ngIf="auth.isLoggedIn()">
      <button mat-button routerLink="/login" (click)="logout()">Logout</button>
      <button mat-button routerLink="/home">Home</button>
      <span style="flex: 1 1 auto;"></span>
      <span class="badge" style="margin-right:10px;">
        <i class="glyphicon glyphicon-user fa-2x"></i>
      </span>
      <span > {{ user }} </span>
    </mat-toolbar>
      `
})
export class NavComponentComponent implements OnInit {
  user : string;
  
  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('connected-user')).username;
  }

  logout(){
    this.auth.logout();
  }

  isAdmin

}
