import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../shared/model/user.model';
import { ApiService } from '../../shared/service/api.service'

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  userForm: FormGroup;
  quizzes;
  constructor(private api:ApiService ) { }

  ngOnInit() {
    this.getQuizzes();
    this.userForm = new FormGroup ({
      'first_name':  new FormControl('',Validators.required),
      'last_name':  new FormControl(),
      'address':  new FormControl(),
      'email':  new FormControl(),
      'gender':  new FormControl(),
      'password':  new FormControl(),
      'quiz':  new FormControl(),
      'username': new FormControl()
    });
  }

  addCandidate(form: NgForm) {
    
    const formValues = Object.assign({}, form.value);

    formValues.admin = false;
    this.api.post('users', formValues)
      .subscribe(data => {
        console.log(form);
        form.reset();
      });
  };
  getQuizzes(){
    this.api.get('quizzes').subscribe(response => {
      this.quizzes = response;

    }, error => {
        console.log("Unable to get quizzes");
    }); 
  }
  
}
