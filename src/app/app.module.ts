import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
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

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { CreateProjectModalComponent } from './modals/create-project-modal/create-project-modal.component';
import { CreateRequestModalComponent } from './modals/create-request-modal/create-request-modal.component';
import { ProfileSettingsComponent } from './pages/profile-settings/profile-settings.component';
import { CreateProfileModalComponent } from './modals/create-profile-modal/create-profile-modal.component';
import { CreateCompetenceModalComponent } from './modals/create-competence-modal/create-competence-modal.component';
import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';
import { UpdateRequestModalComponent } from './modals/update-request-modal/update-request-modal.component';

import { DataSharingService } from './services/data-sharing/data-sharing.service';

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
  	CreateCompetenceModalComponent,
  	RequestsComponent,
  	ConfirmModalComponent,
  	UpdateRequestModalComponent,
  	RequestComponent,
  ],
  providers: [
  	DataSharingService
  ],
  entryComponents: [
  	CreateProjectModalComponent,
  	CreateRequestModalComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
