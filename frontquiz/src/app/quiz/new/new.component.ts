import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/service/api.service'; 


@Component({
  selector: 'app-new',
  template: `
  <mat-card class="card">
    <mat-card-content>
      <mat-form-field>
          <input [(ngModel)]="quiz.type" matInput placeholder="Type" />
      </mat-form-field>

      <mat-form-field>
          <input [(ngModel)]="quiz.level" matInput placeholder="Level">
      </mat-form-field>

      <mat-card-actions>
          <button (click)="post()" mat-button color="primary">POST</button>
      </mat-card-actions>
    </mat-card-content>
  </mat-card>
  `,
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  constructor(private ApiService: ApiService) { }

  ngOnInit() {
  }


}
