import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestOptions, RequestMethod, Response } from '@angular/http'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';


@Injectable()
export class ApiService {

  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: Http, private auth: AuthService) { }
  
  get(url: string) {
    return this.request(url, RequestMethod.Get);
  }

  post(url: string, body: Object) {
    return this.request(url, RequestMethod.Post, body);
  }

  put(url: string, body: Object) {
    return this.request(url, RequestMethod.Put, body);
  }

  delete(url: string) {
    return this.request(url, RequestMethod.Delete);
  }

  request(url: string, method: RequestMethod, body?: Object){
    const headers = new Headers;
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${this.auth.getToken()}`);

    const requestOptions = new RequestOptions({
      url: `${this.baseUrl}/${url}`,
      method: method,
      headers: headers
    });
    
    if (body) {
      requestOptions.body = body;
    }

    const request = new Request(requestOptions);

    return this.http.request(request)
      .map((res: Response) => res.json())
      .catch((res: Response) => this.onRequestError(res));
  }

  onRequestError(res: Response){
    const statusCode = res.status;
    const body = res.json();

    const error = {
      statusCode: statusCode,
      error: body.error
    };

    return Observable.throw(error);
  }

}

// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/toPromise';


// @Injectable()
// export class ApiService {
//     BASE_URL = 'http://localhost:3000/api';     

//     quizzes;
//     questions;
//     responses;
//     constructor(private http: HttpClient) {
//         this.getQuizes();
//     }

//     getQuizes() {
//       return this.http.get(this.BASE_URL + '/quizzes');
//     }

//     getQuiz(idQuiz){
//         return this.http.get(this.BASE_URL + '/quizzes/'+idQuiz);
//     }

//     deleteQuiz(idQuiz){
//         return this.http.delete(this.BASE_URL + '/quizzes/'+idQuiz);
//     }

//     postQuizz(quiz){
//         return this.http.post(this.BASE_URL + '/quizzes', quiz)
//     }

//     updateQuizz(quiz){
//         return this.http.put(this.BASE_URL + '/quizzes/'+quiz.id, quiz)
//     }

//     getQuestions(idQuiz) {
//         return this.http.get(this.BASE_URL + '/quizzes/' + idQuiz + '/questions');
//     }
//     getQuestion(idQuestion) {
//         return this.http.get(this.BASE_URL + '/questions/' + idQuestion);
//     }

//     addQuestion(question){
//         return this.http.post(this.BASE_URL + '/questions', question)
//     }

//     deleteQuestion(idQuestion){
//         return this.http.delete(this.BASE_URL + '/questions/'+idQuestion);
//     }

//     updateQuestion(question){
//         return this.http.put(this.BASE_URL + '/questions/'+question.id, question);
//     }

//     addResponse(response){
//         return this.http.post(this.BASE_URL + '/responses', response)
//     }
    
//     getResponse(responseId) {
//         return this.http.get(this.BASE_URL + '/responses/'+responseId);
//     }
//     deleteResponse(responseId) {
//         return this.http.delete(this.BASE_URL + '/responses/'+responseId);
//     }

//     getResponsesForQuestion(idQuiz, idQuestion) {
//         return this.http.get(this.BASE_URL + '/quizzes/'+idQuiz+'/questions/'+idQuestion);
//     }

//     getIdFirstQuestionidQuiz(idQuiz){
//         return this.http.get(this.BASE_URL + '/quizzes/'+idQuiz);
//     }

//     saveResponseChecked(response){
//         return this.http.put(this.BASE_URL + '/responses/'+response.id, response);
//     }

//     getResponsesForQuizz(idQuiz) {
//         return this.http.get(this.BASE_URL + '/responses/quiz/'+idQuiz);
//     }

// }