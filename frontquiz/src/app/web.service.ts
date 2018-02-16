import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class WebService {
    BASE_URL = 'http://localhost:3000/api';

    quizzes;
    constructor(private http: HttpClient) {
        this.getQuizes();
    }

    getQuizes() {
      this.http.get(this.BASE_URL + '/quizzes').subscribe(response => {
          this.quizzes = response;
      }, error => {
          console.log("Unable to get messages");
      });
    }

}