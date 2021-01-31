import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, ComponentFactory,ComponentRef, ComponentFactoryResolver, ViewContainerRef, ChangeDetectorRef, TemplateRef, ViewChild, Output, EventEmitter } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from "./app.component";
import { ProjectComponent } from './pages/project/project.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TablesComponent } from './pages/tables/tables.component';
import { PlanningComponent } from './pages/planning/planning.component';
import { AdministrationComponent } from './pages/administration/administration.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { RequestComponent } from './pages/request/request.component';

import { PlanningRowComponent } from './components/planning-row/planning-row.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { CreateProjectModalComponent } from './modals/create-project-modal/create-project-modal.component';
import { CreateRequestModalComponent } from './modals/create-request-modal/create-request-modal.component';
import { ProfileSettingsComponent } from './pages/profile-settings/profile-settings.component';
import { CreateProfileModalComponent } from './modals/create-profile-modal/create-profile-modal.component';
import { CreateResourceModalComponent } from './modals/create-resource-modal/create-resource-modal.component';
import { CreateCompetenceModalComponent } from './modals/create-competence-modal/create-competence-modal.component';
import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';
import { UpdateRequestModalComponent } from './modals/update-request-modal/update-request-modal.component';

import { DataSharingService } from './services/data-sharing.service';
import { DirectiveAddresourceDirective } from './directives/directive-addresource.directive';

import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { fakeBackendProvider } from './helpers/fake-backend';
import { SettingsComponent } from './pages/settings/settings.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
	ReactiveFormsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule
  ],
  declarations: [
  	AppComponent, 
  	ProjectComponent,
  	TablesComponent,
  	DashboardComponent,
  	PlanningComponent,
  	AdministrationComponent,
  	CreateProjectModalComponent,
  	CreateRequestModalComponent,
  	ProfileSettingsComponent,
  	AdministrationComponent,
  	CreateProfileModalComponent,
  	CreateResourceModalComponent,
  	CreateCompetenceModalComponent,
  	RequestsComponent,
  	ConfirmModalComponent,
  	UpdateRequestModalComponent,
  	RequestComponent,
  	DirectiveAddresourceDirective,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
  ],
  providers: [
  	DataSharingService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider
  ],
  entryComponents: [
  	CreateProjectModalComponent,
  	CreateResourceModalComponent,
  	CreateRequestModalComponent,
  	PlanningRowComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

