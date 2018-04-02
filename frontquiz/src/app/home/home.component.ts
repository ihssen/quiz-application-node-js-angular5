import { Component } from '@angular/core';
import { ApiService } from '../shared/service/api.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import { LocalDataSource } from 'ng2-smart-table';
import {Router} from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

   quizzes;
    source: LocalDataSource;
    constructor(private ApiService: ApiService, private toastr: ToastrService, private route: Router) {}
    settings = {
      // selectMode: 'multi',
      // mode: 'external',
      
      delete: {
        confirmDelete: true,
        deleteButtonContent: '<i class="glyphicon glyphicon-remove-circle"></i>'
      },
      add: {
        confirmCreate: true,
        addButtonContent: '<i class="glyphicon glyphicon-plus"></i>',
        createButtonContent: '<i class="glyphicon glyphicon-saved"></i>',
        cancelButtonContent: '<i class="glyphicon glyphicon-circle-arrow-left"></i>'
      },
      edit: {
        confirmSave: true,
        editButtonContent: '<i class="glyphicon glyphicon-edit"></i>',
        saveButtonContent: '<i class="glyphicon glyphicon-saved"></i>',
        cancelButtonContent: '<i class="glyphicon glyphicon-circle-arrow-left"></i>'
      },

      actions: {
        custom: [
          {
            name: 'manage',
            title: '<i class="glyphicon glyphicon-cog"></i> ',
          },
          {
            name: 'start',
            title: '<i class="glyphicon glyphicon-play-circle"></i> ',
          }
        ]
      },
      columns: {
        // id: {
        //   title: 'Id',
        //   filter: false,
        //   editable: false
        // },
        type: {
          title: 'Technologie',
          filter: false,
          sort: true
        },
        level: {
          title: 'Level',
          filter: false,
          sort: true
        }
      },
      pager: {
        display: true,
        perPage: 5,
      },
      defaultStyle: true,
      attr: {
        class: 'table table-bordered table-striped table-responsive' // this is custom table scss or css class for table
      }
    };

    quiz = {
      id: "",
      type: "",
      level: ""
    }
    ngOnInit(){
      this.ApiService.get('quizzes').subscribe(response => {
        this.quizzes = response;
        this.source = new LocalDataSource(this.quizzes);     

      }, error => {
          console.log("Unable to get quizzes");
      }); 
    }

    onSearch(query: string = '') {
      this.source.setFilter([
      // fields we want to include in the search
      {
        field: 'type',
        search: query
      },
      {
        field: 'level',
        search: query
      }
   ], false);
  }
    
    // deleteQuiz(quizId: number) {
    //   swal({
    //     title: 'Are you sure?',
    //     text: "You won't be able to revert this!",
    //     type: 'warning',
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: 'Yes, delete it!'
    //   }).then((result) => {
    //     if (result.value) {
    //       this.ApiService.deleteQuiz(quizId).subscribe(res => {
    //         this.quizzes = this.quizzes.filter((quiz) => quiz.id !== quizId);
            
    //       });
    //       this.toastr.success('Quiz has been deleted.');

    //     }
    //     else this.toastr.error('Quiz hasn\'t been deleted.');
    //   })
    //   }

    
    //   post() {
    //     if(this.quiz.id){
    //       console.log("appel update"); //// faire appel a la mise ajour de quiz
    //       this.ApiService.updateQuizz(this.quiz).subscribe(response => {
    //         this.ApiService.getQuizes();
    //         this.quiz = { id: "",level: "",type: ""};
    //         this.toastr.success('Quiz has been updated.');
    //         }, error => {
    //         console.log('Unable to put quizz');
    //       });
    //     }else {
    //       this.ApiService.postQuizz(this.quiz).subscribe(responses => {
    //         this.ApiService.getQuizes();
    //         this.quiz.id = '';
    //         this.quiz.level = '';
    //         this.quiz.type = '';
    //         }, error => {
    //         console.log('Unable to post quiz');
    //       });
    //     }
        
    //   }

    // getQuiz(idQuiz) {
    //   this.ApiService.getQuiz(idQuiz).subscribe(response => {
    //       this.quiz = response[0];
    //     }, error => {
    //       console.log('Unable to get questions');
    //     });
    // }

    onDeleteConfirm(event) {
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
          this.ApiService.delete(`quizzes/${event.data._id}`).subscribe(res => {
            event.confirm.resolve();
            this.toastr.success('Quiz has been deleted.');
          });
        }
        else {
          this.toastr.error('Quiz hasn\'t been deleted.');
          // event.confirm.reject();
        }
      })
    }
  

  
    onCreateConfirm(event) {
      var quiz = { "type": event.newData.type, "level": event.newData.level};
      this.ApiService.post('quizzes',quiz).subscribe(responses => {});
      if (window.confirm('Are you sure you want to create?')) {
        event.newData['name'] += ' + added in code';
        event.confirm.resolve(event.newData);
      } else {
        event.confirm.reject();
      }
    }

    onEditConfirm(event) {
      var quiz = { "type": event.newData.type, "level": event.newData.level};
      this.ApiService.put(`quizzes/${event.data._id}`, quiz).subscribe(responses => { console.log(responses); });
      if (window.confirm('Are you sure you want to create?')) {
        event.confirm.resolve(event.newData);
      } else {
        event.confirm.reject();
      }
    }

    customAction(event) {
      if(event.action == 'manage')
        this.route.navigateByUrl(`/quiz/${event.data._id}/manage`);
      
      if(event.action == 'start')
        this.route.navigateByUrl(`/quiz/${event.data._id}/start`);
    }

   

}
