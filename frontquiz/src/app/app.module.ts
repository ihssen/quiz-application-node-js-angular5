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
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { SidebarModule } from './sidebar/sidebar.module';







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
import { AddComponent } from './condidate/add/add.component';
import { ListComponent } from './condidate/list/list.component';

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
    path: 'users/new',
    component: AddComponent,
    canActivate: [AuthGuard]
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
    MatFormFieldModule, MatInputModule, MatCheckboxModule, MatRadioModule,
    ToastrModule.forRoot(), ModalModule.forRoot(),
    TooltipModule.forRoot(),
    DragulaModule, DragDropDirectiveModule, 
    Ng2SmartTableModule,
    SidebarModule,
    AngularFontAwesomeModule
  ],
  providers: [ ApiService, AuthService, AuthGuard ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
