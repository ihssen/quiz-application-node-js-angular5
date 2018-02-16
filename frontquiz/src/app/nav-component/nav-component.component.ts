import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nav',
  template: `
    <mat-toolbar color="primary">
      <button mat-button routerLink="/">Login</button>
      <button mat-button routerLink="/">Contact</button>
    </mat-toolbar>
      `
})
export class NavComponentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
