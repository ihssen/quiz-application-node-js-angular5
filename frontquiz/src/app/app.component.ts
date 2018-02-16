import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebService } from './web.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: ['./app.component.css']
})
export class AppComponent {

    

    constructor(private webService: WebService) {}

    ngOnInit(){
        this.webService.getQuizes();
        
    }    
}
