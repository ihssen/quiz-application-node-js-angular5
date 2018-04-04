import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router"
import { MatInputModule, MatFormFieldModule, MatToolbarModule, MatButtonModule, MatCardModule } from '@angular/material';
import { MatStepperModule} from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatRadioModule, MatSelectModule } from '@angular/material';
import { ToastrModule } from 'ngx-toastr';
import swal from 'sweetalert2';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DragulaModule } from 'ng2-dragula';
import { DragDropDirectiveModule} from "angular4-drag-drop";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';


import { SidebarModule } from './sidebar/sidebar.module';




import { ApiService } from './shared/service/api.service';
import { AuthService } from './shared/service/auth.service'
import { AuthGuard } from './shared/guard/auth.guard';
import { AuthenticationService } from './shared/service/fire-base/authentication.service';


import { AppComponent } from './app.component';
import { NavComponentComponent } from './nav-component/nav-component.component';
import { StartComponent } from './quiz/start/start.component';
import { HomeComponent } from './home/home.component';
import { ResultComponent } from './quiz/result/result.component';
import { ResponsesOfQuestionPipe } from './pipe/responses-of-question.pipe';
import { NewComponent } from './quiz/new/new.component';
import { ManageComponent } from './quiz/manage/manage.component';
import { LoginComponent } from './login/login.component';
import { AddComponent } from './candidate/add/add.component';
import { ListComponent } from './candidate/list/list.component';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

var routes = [
  
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',
    // canActivate: [AuthGuard]
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
    canActivate: [AuthGuard]

  },
  {
    path: 'quiz/:id/result',
    component: ResultComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'quiz/new',
    component: NewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'quiz/:id/manage',
    component: ManageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'candidate/new',
    component: AddComponent,
    canActivate: [AuthGuard]
  }
  ,
  {
    path: 'candidates/list',
    component: ListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'quiz/:id/start/:token/:username/:admin',
    component: StartComponent,
   
  }
];


@NgModule({
  declarations: [
    AppComponent, NavComponentComponent, StartComponent, HomeComponent,
    ResultComponent, ResponsesOfQuestionPipe, NewComponent,
    ManageComponent, LoginComponent, AddComponent,
    AddComponent,
    ListComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    HttpClientModule, HttpModule,
    RouterModule.forRoot(routes),
    MatToolbarModule, MatButtonModule, MatStepperModule, MatCardModule,
    FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatCheckboxModule, MatRadioModule, MatSelectModule,
    ToastrModule.forRoot(), ModalModule.forRoot(),
    TooltipModule.forRoot(),
    DragulaModule, DragDropDirectiveModule, 
    Ng2SmartTableModule,
    SidebarModule,
    AngularFontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [ ApiService, AuthService, AuthGuard, AuthenticationService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
