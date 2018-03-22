import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/service/api.service';
import { AuthService } from '../shared/service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: string;

  constructor(private api: ApiService,
              private auth: AuthService,
              private router: Router,
              private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
    this.returnUrl = this.activateRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit(form: NgForm) {
    const values = form.value;

    const payload = {
      username: values.username,
      password: values.password
    };

    this.api.post('authenticate', payload)
      .subscribe(data => {
        this.auth.setToken(data.token);
        console.log(this.returnUrl);
        this.router.navigateByUrl(this.returnUrl);
        // this.router.navigate(['/home']);
      });
  }

}
