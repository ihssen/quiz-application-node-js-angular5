import { Component } from '@angular/core';
import { WebService } from '../web.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2'



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

    

    constructor(private webService: WebService, private toastr: ToastrService) {}

    quiz = {
      id: "",
      type: "",
      level: ""
    }
    ngOnInit(){
        this.webService.getQuizes();       
    }
    
    
    deleteQuiz(quizId: number) {
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
          this.webService.deleteQuiz(quizId).subscribe(res => {
            this.webService.quizzes = this.webService.quizzes.filter((quiz) => quiz.id !== quizId);
            
          });
          this.toastr.success('Quiz has been deleted.');

        }
        else this.toastr.error('Quiz hasn\'t been deleted.');
      })
      }

    
      post() {
        if(this.quiz.id){
          console.log("appel update"); //// faire appel a la mise ajour de quiz
          this.webService.updateQuizz(this.quiz).subscribe(response => {
            this.webService.getQuizes();
            this.quiz = { id: "",level: "",type: ""};
            this.toastr.success('Quiz has been updated.');
            }, error => {
            console.log('Unable to put quizz');
          });
        }else {
          this.webService.postQuizz(this.quiz).subscribe(responses => {
            this.webService.getQuizes();
            this.quiz.id = '';
            this.quiz.level = '';
            this.quiz.type = '';
            }, error => {
            console.log('Unable to post quiz');
          });
        }
        
      }

      getQuiz(idQuiz) {
        this.webService.getQuiz(idQuiz).subscribe(response => {
            this.quiz = response[0];
          }, error => {
            console.log('Unable to get questions');
          });
        }
}
