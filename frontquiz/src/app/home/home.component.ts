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
         this.webService.postQuizz(this.quiz).subscribe(responses => {
          this.webService.getQuizes();
          }, error => {
          console.log('Unable to get questions');
        });
      }
}
