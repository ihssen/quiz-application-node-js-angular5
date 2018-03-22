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

  constructor(private api:ApiService ) { }

  ngOnInit() {
    this.userForm = new FormGroup ({
      'first_name':  new FormControl('',Validators.required),
      'last_name':  new FormControl(),
      'address':  new FormControl(),
      'email':  new FormControl(),
      'gender':  new FormControl(),
      'password':  new FormControl(),
    });
  }

  addCandidate(form: NgForm) {

    const formValues = Object.assign({}, form.value);

    formValues.admin = false;
    this.api.post('users', formValues)
      .subscribe(data => {
        form.reset();
      });
  };

}
