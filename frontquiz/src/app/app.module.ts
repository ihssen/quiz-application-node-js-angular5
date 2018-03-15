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
import { Ng2SmartTableModule } from 'ng2-smart-table';






import { ApiService } from './shared/service/api.service';
import { AuthService } from './shared/service/auth.service'
import { AuthGuard } from './shared/guard/auth.guard';

import { AppComponent } from './app.component';
import { NavComponentComponent } from './nav-component/nav-component.component';
import { StartComponent } from './quiz/start/start.component';
import { HomeComponent } from './home/home.component';
import { ResultComponent } from './quiz/result/result.component';
import { ResponsesOfQuestionPipe } from './pipe/responses-of-question.pipe';
import { NewComponent } from './quiz/new/new.component';
import { ManageComponent } from './quiz/manage/manage.component';
import { LoginComponent } from './login/login.component';

var routes = [

  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
      path: 'login',
      component: LoginComponent,
      pathMatch: 'full',

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
    AppComponent, NavComponentComponent, StartComponent, HomeComponent, ResultComponent, ResponsesOfQuestionPipe, NewComponent, ManageComponent, LoginComponent
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
    DragulaModule, DragDropDirectiveModule, 
    Ng2SmartTableModule
  ],
  providers: [ ApiService, AuthService, AuthGuard ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
