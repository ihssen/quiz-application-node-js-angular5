import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebService } from '../../web.service';
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

  BASE_URL = 'http://localhost:3000/api';  
  questions;
  responses;
  idQuestion;
  idQuiz;

  constructor(private route: ActivatedRoute, private _formBuilder: FormBuilder, private webService:  WebService, private http :HttpClient) {
    let q: any;
    var idQuestion;
    
   }

  ngOnInit() {
    this.idQuiz = this.route.snapshot.params.id;
    this.webService.getQuestions(this.idQuiz).subscribe(questions => {
      this.questions = questions;
      if(this.questions.length > 0) {
          this.idQuestion = this.questions.reduce((a, b) => a.id < b.id ? a : b).id;
          console.log(this.idQuiz, this.idQuestion);
        this.getResponsesForQuestion(this.idQuiz, this.idQuestion);
        }
      }, error => {
      console.log('Unable to get questions');
    });
  }

  getResponsesForQuestion(idQuiz,idQuestion){
    this.webService.getResponsesForQuestion(idQuiz, idQuestion).subscribe(responses => {
      this.responses = responses;
      }, error => {
      console.log('Unable to get questions');
    });
  }

  saveResponse(response){
    if(response.is_checked == false )
      response.is_checked = true;
    else
      response.is_checked = false;
    
    this.webService.saveResponseChecked(response).subscribe(res => {
        console.log(res);
      });
  }


}
