import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class WebService {
    BASE_URL = 'http://localhost:3000/api';     

    quizzes;
    questions;
    responses;
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

    postQuizz(quiz){
        console.log(quiz);
        return this.http.post(this.BASE_URL + '/quizzes', quiz)
    }

    getQuestions(idQuiz) {
        return this.http.get(this.BASE_URL + '/quizzes/' + idQuiz + '/questions');
    }


    getResponsesForQuestion(idQuiz, idQuestion) {
        return this.http.get(this.BASE_URL + '/quizzes/'+idQuiz+'/questions/'+idQuestion);
    }

    getIdFirstQuestionidQuiz(idQuiz){
        return this.http.get(this.BASE_URL + '/quizzes/'+idQuiz);
    }

    saveResponseChecked(response){
        return this.http.put(this.BASE_URL + '/responses/'+response.id, response);
    }

    deleteQuiz(idQuiz){
        return this.http.delete(this.BASE_URL + '/quizzes/'+idQuiz);
    }

    getResponsesForQuizz(idQuiz) {
        return this.http.get(this.BASE_URL + '/responses/'+idQuiz);
    }

}