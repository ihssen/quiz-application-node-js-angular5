import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './shared/service/api.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: ['./app.component.css']
})
export class AppComponent {

    

    constructor(private ApiService: ApiService) {}

    ngOnInit(){

        
    }    
}
