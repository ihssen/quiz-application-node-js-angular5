import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { WebService } from '../../web.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {


  questions;
  responses;
  idQuiz;

  response = {
    id: '',
    id_quizz: "",
    id_question: "",
    text: "",
    is_right: ""
  }

  question = {
    id: "",
    id_quizz: "",
    text: "",
  }

  modalRef: BsModalRef;
  constructor(private route: ActivatedRoute , private webService:  WebService, private http :HttpClient, private toastr: ToastrService, private modalService: BsModalService) { }

  ngOnInit() {
    this.idQuiz = this.route.snapshot.params.id;
    this.getQuestions(this.idQuiz);
  }

  getQuestions(idQuiz){
    this.webService.getQuestions(idQuiz).subscribe(questions => {
      this.questions = questions;
      }, error => {
      console.log('Unable to get questions');
    });
    this.getResponsesForQuiz(this.idQuiz);
  }
  openModalAdd(template: TemplateRef<any>, idQuestion) {
    this.response.id_question = idQuestion;
    this.modalRef = this.modalService.show(template);
  }

  openModalUpdate(template: TemplateRef<any>, idResponse) {
    this.getResponse(idResponse);
    this.modalRef = this.modalService.show(template);
  }

  getResponsesForQuiz(idQuiz){
    this.webService.getResponsesForQuizz(idQuiz).subscribe(res => {
      this.responses = res;
      }, error => {
      console.log('Unable to get questions');
    });
  }

  getResponse(responseId){
    this.webService.getResponse(responseId).subscribe(res => {
      this.response = res[0];
      }, error => {
      console.log('Unable to get response');
    });
  }

  deleteQuestion(questionId) {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.webService.deleteQuestion(questionId).subscribe(res => {
          this.questions = this.questions.filter((question) => question.id !== questionId);
          this.toastr.success('Quiz has been deleted.');
        });
      }
      else this.toastr.error('Quiz hasn\'t been deleted.');
    })
  }

  addResponse() {
    this.response.id_quizz = this.idQuiz;
    
    if(this.response.id){
      this.webService.saveResponseChecked(this.response).subscribe(res => {
        this.getResponsesForQuiz(this.idQuiz);
    })
    }
    else{
      this.webService.addResponse(this.response).subscribe(res => {
        this.getResponsesForQuiz(this.idQuiz);
        }, error => {
          this.toastr.error('Unable to post quiz.');
      });
    }
    this.response.id = ''
    this.response.id_quizz = '',
    this.response.id_question = '',
    this.response.text = '';
    this.response.is_right = '';
    this.modalRef.hide();
    }

  deleteResponse(idResponse){
    this.webService.deleteResponse(idResponse).subscribe(res => {
      this.responses = this.responses.filter((response) => response.id !== idResponse);
      this.toastr.success('Quiz has been deleted.');
    });
  }

  openModalQuestion(template: TemplateRef<any>, idQuestion) {
   
    this.question.id =  idQuestion;
    this.getQuestion(idQuestion);
    this.modalRef = this.modalService.show(template);
  }

  getQuestion(questionId){
    this.webService.getQuestion(questionId).subscribe(res => {
      this.question = res[0];
      console.log(res[0]);
      }, error => {
      console.log('Unable to get question');
    });
  }

  postQuestion() {
    console.log(this.question.id)
    
    if(this.question.id !== ''){
      console.log("azerty",this.question.id)
      this.webService.updateQuestion(this.question).subscribe(res => {
        this.getQuestions(this.idQuiz);
      })
    }
    else{
      this.question.id_quizz = this.idQuiz,
      this.webService.addQuestion(this.question).subscribe(res => {
        this.getQuestions(this.idQuiz);
        }, error => {
          this.toastr.error('Unable to post quiz.');
      });
    }
    this.question.id = ''
    this.question.id_quizz = '',
    this.question.text = '';
    this.modalRef.hide();
    }
}
