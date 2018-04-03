import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/service/api.service'; 
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  questions;
  responses;
  idQuiz;

  constructor(private route: ActivatedRoute , private ApiService:  ApiService, private http :HttpClient) { }

  ngOnInit() {
    this.idQuiz = this.route.snapshot.params.id;
    this.ApiService.get(`questions/quiz/${this.idQuiz}`).subscribe(questions => {
      this.questions = questions;
      }, error => {
      console.log('Unable to get questions');
    });
    this.getResponsesForQuiz(this.idQuiz);
  }

  getResponsesForQuiz(idQuiz){
    this.ApiService.get(`answers/quiz/${idQuiz}`).subscribe(responses => {
      console.log(responses);
      this.responses = responses;
      }, error => {
      console.log('Unable to get questions');
    });
  }

  

}
