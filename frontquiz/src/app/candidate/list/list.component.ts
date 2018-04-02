import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/service/api.service';
import swal from 'sweetalert2';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  users;
  constructor(private apiService: ApiService, private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.apiService.get('users').subscribe(response => {
     
    this.users = response;
    }, error => {
      console.log('Unable to get users');
    });
  }

  sendInvitation(user){
    swal({
      title: 'Are you sure?',
      text: `an invitation will be sent to the candidate ${user.email}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.spinnerService.show();
        this.apiService.post('sent-email',user).subscribe(response => {
          console.log('email was sent');
          this.spinnerService.hide();
          }, error => {
            console.log('Unable to sent email');
          });
        }
        this.spinnerService.hide();
      
    })
    
  }
}
