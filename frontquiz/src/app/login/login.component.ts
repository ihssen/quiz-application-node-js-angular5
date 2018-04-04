import { Component, OnInit, Injectable } from '@angular/core';
import { ApiService } from '../shared/service/api.service';
import { AuthService } from '../shared/service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../shared/service/fire-base/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: string;

  constructor(private api: ApiService,
              private auth: AuthService,
              public authFirebase: AuthenticationService,
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
    // console.log(this.router.navigateByUrl(this.returnUrl));
    this.api.post('authenticate', payload)
      .subscribe(data => {
        this.auth.setToken(data);
        this.router.navigateByUrl(this.returnUrl);
        // this.router.navigate(['/home']);
      });
  }

  signInWithTwitter() {
    this.authFirebase.signInWithTwitter()
    .then((res) => { 
      // JWT_SECRET=
      // console.log(res.user._lat+".5zFKzII6a448valFXkoM1cGQyaqVUWWd7Vv6L4M7J01ydE9kzrvpZwHBFh1Pt1X");

      this.auth.setToken(res.user._lat);
      this.router.navigate(['home']);        
    })
    .catch((err) => console.log(err));
  }


  signInWithFacebook() {
    this.authFirebase.signInWithFacebook()
    .then((res) => { 
        this.router.navigate(['home'])
      })
    .catch((err) => console.log(err));
  }

  signInWithGoogle() {
    this.authFirebase.signInWithGoogle()
    .then((res) => { 
      this.auth.setToken(res.user._lat);
        this.router.navigate(['home'])
      })
    .catch((err) => console.log(err));
  }

}
