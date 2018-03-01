import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router"
import { MatInputModule, MatFormFieldModule, MatToolbarModule, MatButtonModule, MatCardModule } from '@angular/material';
import { MatStepperModule} from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatRadioModule } from '@angular/material';
import { ToastrModule } from 'ngx-toastr';
import swal from 'sweetalert2';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DragulaModule } from 'ng2-dragula';
import { DragDropDirectiveModule} from "angular4-drag-drop";





import { WebService } from './web.service';
import { AppComponent } from './app.component';
import { NavComponentComponent } from './nav-component/nav-component.component';
import { StartComponent } from './quiz/start/start.component';
import { HomeComponent } from './home/home.component';
import { ResultComponent } from './quiz/result/result.component';
import { ResponsesOfQuestionPipe } from './pipe/responses-of-question.pipe';
import { NewComponent } from './quiz/new/new.component';
import { ManageComponent } from './quiz/manage/manage.component';

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
  },
  {
    path: 'quiz/:id/manage',
    component: ManageComponent,
  }
];


@NgModule({
  declarations: [
    AppComponent, NavComponentComponent, StartComponent, HomeComponent, ResultComponent, ResponsesOfQuestionPipe, NewComponent, ManageComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    HttpClientModule, HttpModule,
    RouterModule.forRoot(routes),
    MatToolbarModule, MatButtonModule, MatStepperModule, MatCardModule,
    FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatCheckboxModule, MatRadioModule,
    ToastrModule.forRoot(), ModalModule.forRoot(),
    TooltipModule.forRoot(),
    DragulaModule, DragDropDirectiveModule

  ],
  providers: [ WebService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
