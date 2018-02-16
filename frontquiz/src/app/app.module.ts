import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router"
import { MatToolbarModule, MatButtonModule } from '@angular/material';



import { WebService } from './web.service';
import { AppComponent } from './app.component';
import { NewQuizComponent } from './new-quiz/new-quiz.component';
import { NavComponentComponent } from './nav-component/nav-component.component';
import { StartComponent } from './quiz/start/start.component';

var routes = [
  {
      path: '',
      component: AppComponent,
      pathMatch: 'full'
  },
  {
      path: 'quiz/:id/start',
      component: StartComponent,
      pathMatch: 'full'
  }
];


@NgModule({
  declarations: [
    AppComponent, NewQuizComponent, NavComponentComponent, StartComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    HttpClientModule, HttpModule,
    RouterModule.forRoot(routes),
    MatToolbarModule, MatButtonModule
  ],
  providers: [ WebService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
