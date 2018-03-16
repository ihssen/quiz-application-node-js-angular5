import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/service/auth.service';



@Component({
  selector: 'nav',
  template: `
    <mat-toolbar color="primary" *ngIf="auth.isLoggedIn()">
      <button mat-button routerLink="/login" (click)="logout()">Logout</button>
      <button mat-button routerLink="/home">Home</button>
    </mat-toolbar>
      `
})
export class NavComponentComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  logout(){
    this.auth.logout();
  }

}
