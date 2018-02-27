import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router"
import { MatInputModule, MatFormFieldModule, MatToolbarModule, MatButtonModule, MatCardModule } from '@angular/material';
import { MatStepperModule} from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatRadioModule } from '@angular/material';
import { ToastrModule } from 'ngx-toastr';
import {ModalModule} from 'ngx-modal';
import swal from 'sweetalert2';





import { WebService } from './web.service';
import { AppComponent } from './app.component';
import { NavComponentComponent } from './nav-component/nav-component.component';
import { StartComponent } from './quiz/start/start.component';
import { HomeComponent } from './home/home.component';
import { ResultComponent } from './quiz/result/result.component';
import { ResponsesOfQuestionPipe } from './pipe/responses-of-question.pipe';
import { NewComponent } from './quiz/new/new.component';

var routes = [

  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
      path: 'quiz/:id/start',
      component: StartComponent,
      pathMatch: 'full',

  },
  {
    path: 'quiz/:id/result',
    component: ResultComponent,
    pathMatch: 'full'
  },
  {
    path: 'quiz/new',
    component: NewComponent,
    // pathMatch: 'full'
  }
];


@NgModule({
  declarations: [
    AppComponent, NavComponentComponent, StartComponent, HomeComponent, ResultComponent, ResponsesOfQuestionPipe, NewComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    HttpClientModule, HttpModule,
    RouterModule.forRoot(routes),
    MatToolbarModule, MatButtonModule, MatStepperModule, MatCardModule,
    FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatCheckboxModule, MatRadioModule,
    ToastrModule.forRoot(), ModalModule
  ],
  providers: [ WebService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
