import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/service/api.service'; 
import { AuthService } from '../../shared/service/auth.service';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  questions;
  responses;
  idQuestion;
  idQuiz;

  constructor(private route: ActivatedRoute, private _formBuilder: FormBuilder, private ApiService:  ApiService, private http :HttpClient, private auth: AuthService) {
    let q: any;
    var idQuestion;
    
   }

  ngOnInit() {
    var data = { token: this.route.snapshot.params.token, user: {username: this.route.snapshot.params.username, admin: this.route.snapshot.params.admin}};
    this.auth.setToken(data);
    this.idQuiz = this.route.snapshot.params.id;
    this.ApiService.get(`questions/quiz/${this.idQuiz}`).subscribe(questions => {
      this.questions = questions;
      if(this.questions.length > 0) {
          // this.idQuestion = this.questions.reduce((a, b) => a._$id < b._id ? a : b)._id;
          this.idQuestion = this.questions[0]._id;  
          // console.log(this.idQuestion);        
          // console.log(this.idQuiz, this.idQuestion);
        this.getResponsesForQuestion(this.idQuiz, this.idQuestion);
        }
      }, error => {
      console.log('Unable to get questions');
    });
  }

  getResponsesForQuestion(idQuiz,idQuestion){
    console.log(idQuiz);
    this.ApiService.get(`answers/question/${idQuestion}/quiz/${idQuiz}`).subscribe(responses => {
      this.responses = responses;
      }, error => {
      console.log('Unable to get questions');
    });
  }

  clickInStep(event){
    this.getResponsesForQuestion(this.idQuiz, this.questions[event.selectedIndex]._id)
  }
  saveResponse(response){
    if(response.is_checked == false )
      response.is_checked = true;
    else
      response.is_checked = false;

    this.ApiService.put(`answers/${response._id}`, response).subscribe(res => {
        console.log(res);
      });
  }


}
