import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, ComponentFactory,ComponentRef, ComponentFactoryResolver, ViewContainerRef, ChangeDetectorRef, TemplateRef, ViewChild, Output, EventEmitter } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from "./app.component";

import { PlanningRowComponent } from './components/planning-row/planning-row.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { CreateProjectModalComponent } from './modals/create-project-modal/create-project-modal.component';
import { CreateRequestModalComponent } from './modals/create-request-modal/create-request-modal.component';
import { CreateProfileModalComponent } from './modals/create-profile-modal/create-profile-modal.component';
import { CreateResourceModalComponent } from './modals/create-resource-modal/create-resource-modal.component';
import { CreateCompetenceModalComponent } from './modals/create-competence-modal/create-competence-modal.component';
import { DeleteModalComponent } from './modals/delete-modal/delete-modal.component';
import { UpdateRequestModalComponent } from './modals/update-request-modal/update-request-modal.component';
import { AddResourceToTaskModalComponent } from './modals/add-resource-to-task-modal/add-resource-to-task-modal.component';
import { AddResourceToProjectModalComponent } from './modals/add-resource-to-project-modal/add-resource-to-project-modal.component';
import { CreateSubprojectModalComponent } from './modals/create-subproject-modal/create-subproject-modal.component';
import { CreateTaskModalComponent } from './modals/create-task-modal/create-task-modal.component';

import { DataSharingService } from './services/data-sharing.service';
import { UtilsService } from './services/utils.service';
import { DirectiveAddresourceDirective } from './directives/directive-addresource.directive';

import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { fakeBackendProvider } from './helpers/fake-backend';
import { KeysPipe } from './pipes/keys.pipe';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { ProfilesComponent } from './pages/profiles/profiles.component';
import { CompetencesComponent } from './pages/competences/competences.component';
import { ProfileSettingsComponent } from './pages/profile-settings/profile-settings.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ProjectComponent } from './pages/project/project.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TablesComponent } from './pages/tables/tables.component';
import { PlanningComponent } from './pages/planning/planning.component';
import { AdministrationComponent } from './pages/administration/administration.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { RequestComponent } from './pages/request/request.component';
import { TodoComponent } from './pages/todo/todo.component';
import { SubprojectComponent } from './pages/subproject/subproject.component';
import { AssignmentComponent } from './pages/assignment/assignment.component';
import { CreateTodoItemModalComponent } from './modals/create-todo-item-modal/create-todo-item-modal.component';
import { CreateNeedModalComponent } from './modals/create-need-modal/create-need-modal.component';
import { WeekTableComponent } from './components/tables/week-table/week-table.component';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
	ReactiveFormsModule,
    ToastrModule.forRoot(),
    
    MatFormFieldModule,
	MatInputModule,
	MatDatepickerModule,
	MatNativeDateModule,
	MatAutocompleteModule,
  ],
  declarations: [
  	AppComponent, 
  	ProjectComponent,
    SubprojectComponent,
  	TablesComponent,
  	DashboardComponent,
  	PlanningComponent,
  	AdministrationComponent,
  	ProfileSettingsComponent,
  	AdministrationComponent,
  	
  	CreateProjectModalComponent,
  	CreateRequestModalComponent,
  	CreateProfileModalComponent,
  	CreateResourceModalComponent,
  	CreateCompetenceModalComponent,
    AddResourceToTaskModalComponent,
    AddResourceToProjectModalComponent,
    DeleteModalComponent,
  	UpdateRequestModalComponent,
  	
  	RequestsComponent,
  	RequestComponent,
  	DirectiveAddresourceDirective,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    ProfilesComponent,
    CompetencesComponent,
    TodoComponent,
    CreateSubprojectModalComponent,
    CreateTaskModalComponent,
    AssignmentComponent,
    CreateTodoItemModalComponent,
    AddResourceToProjectModalComponent,
    CreateNeedModalComponent,
  	WeekTableComponent, 
  	
  	KeysPipe, 
    
  ],
  exports: [
    MatFormFieldModule,
	MatInputModule,
	MatDatepickerModule,
	MatNativeDateModule,
	MatAutocompleteModule,
  	KeysPipe,
  ],
  providers: [
  	DataSharingService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider,
    UtilsService,
  	KeysPipe
  ],
  entryComponents: [
  	CreateProjectModalComponent,
  	CreateResourceModalComponent,
  	CreateRequestModalComponent,
  	CreateTodoItemModalComponent,
  	AddResourceToTaskModalComponent,
  	DeleteModalComponent,
  	PlanningRowComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

