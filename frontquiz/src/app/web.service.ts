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

    getQuiz(idQuiz){
        return this.http.get(this.BASE_URL + '/quizzes/'+idQuiz);
    }

    deleteQuiz(idQuiz){
        return this.http.delete(this.BASE_URL + '/quizzes/'+idQuiz);
    }

    postQuizz(quiz){
        return this.http.post(this.BASE_URL + '/quizzes', quiz)
    }

    updateQuizz(quiz){
        return this.http.put(this.BASE_URL + '/quizzes/'+quiz.id, quiz)
    }

    getQuestions(idQuiz) {
        return this.http.get(this.BASE_URL + '/quizzes/' + idQuiz + '/questions');
    }
    getQuestion(idQuestion) {
        return this.http.get(this.BASE_URL + '/questions/' + idQuestion);
    }

    addQuestion(question){
        return this.http.post(this.BASE_URL + '/questions', question)
    }

    deleteQuestion(idQuestion){
        return this.http.delete(this.BASE_URL + '/questions/'+idQuestion);
    }

    updateQuestion(question){
        return this.http.put(this.BASE_URL + '/questions/'+question.id, question);
    }

    addResponse(response){
        return this.http.post(this.BASE_URL + '/responses', response)
    }
    
    getResponse(responseId) {
        return this.http.get(this.BASE_URL + '/responses/'+responseId);
    }
    deleteResponse(responseId) {
        return this.http.delete(this.BASE_URL + '/responses/'+responseId);
    }

    getResponsesForQuestion(idQuiz, idQuestion) {
        console.log(idQuiz, idQuestion)
        return this.http.get(this.BASE_URL + '/quizzes/'+idQuiz+'/questions/'+idQuestion);
    }

    getIdFirstQuestionidQuiz(idQuiz){
        return this.http.get(this.BASE_URL + '/quizzes/'+idQuiz);
    }

    saveResponseChecked(response){
        return this.http.put(this.BASE_URL + '/responses/'+response.id, response);
    }

    getResponsesForQuizz(idQuiz) {
        return this.http.get(this.BASE_URL + '/responses/quiz/'+idQuiz);
    }

}