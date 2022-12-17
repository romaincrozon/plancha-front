import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { DatePipe } from '@angular/common'

import { FooterComponent } from "./footer/footer.component"; 
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { ProjectsTableComponent } from './tables/projects-table/projects-table.component';
import { ResourcesTableComponent } from './tables/resources-table/resources-table.component';
import { PlanningTableComponent } from './planning-table/planning-table.component';
import { RequestTableComponent } from './tables/request-table/request-table.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { ProfilesTableComponent } from './tables/profiles-table/profiles-table.component';
import { CompetencesTableComponent } from './tables/competences-table/competences-table.component';
import { PlanningCellComponent } from './planning-cell/planning-cell.component';
import { DatepickerComponent } from './grid-parameters/datepicker/datepicker.component';
import { GridParametersComponent } from './grid-parameters/grid-parameters.component';
import { ViewsComponent } from './grid-parameters/views/views.component';
import { PlanningRowComponent } from './planning-row/planning-row.component';
import { PlanningTaskComponent } from './planning-task/planning-task.component';
import { AlertComponent } from './alert/alert.component';
import { ResourcesTableFullComponent } from './resources-table-full/resources-table-full.component';
import { FilterPipe } from '../pipes/filter.pipe';
import { KeysPipe } from '../pipes/keys.pipe';
import { CountTaskPipePipe } from '../pipes/count-task-pipe.pipe';
import { CountSubprojectPipePipe } from '../pipes/count-subproject-pipe.pipe';
import { CountProjectPipePipe } from '../pipes/count-project-pipe.pipe';
import { ResourcePlanningTableComponent } from './resource-planning-table/resource-planning-table.component';
import { TodoTableComponent } from './tables/todo-table/todo-table.component';
import { FilterComponent } from './grid-parameters/filter/filter.component';
import { NeedProjectTableComponent } from './tables/need-project-table/need-project-table.component';
import { NeedTeamTableComponent } from './tables/need-team-table/need-team-table.component';
import { AvailabilityTableComponent } from './tables/availability-table/availability-table.component';
import { CalendarWeeksComponent } from './calendar-weeks/calendar-weeks.component';
import { MessageComponent } from '../shared/message.component';

import { CreateProjectModalComponent } from './modals/create-project-modal/create-project-modal.component';
import { CreateRequestModalComponent } from './modals/create-request-modal/create-request-modal.component';
import { CreateProfileModalComponent } from './modals/create-profile-modal/create-profile-modal.component';
import { CreateResourceModalComponent } from './modals/create-resource-modal/create-resource-modal.component';
import { CreateCompetenceModalComponent } from './modals/create-competence-modal/create-competence-modal.component';
import { DeleteModalComponent } from './modals/delete-modal/delete-modal.component';
import { UpdateRequestModalComponent } from './modals/update-request-modal/update-request-modal.component';
import { AddResourceToProjectModalComponent } from './modals/add-resource-to-project-modal/add-resource-to-project-modal.component';
import { CreateSubprojectModalComponent } from './modals/create-subproject-modal/create-subproject-modal.component';
import { CreateTodoItemModalComponent } from './modals/create-todo-item-modal/create-todo-item-modal.component';
import { CreateNeedModalComponent } from './modals/create-need-modal/create-need-modal.component';
import { CreateAvailabilityModalComponent } from './modals/create-availability-modal/create-availability-modal.component';
import { WeekTableComponent } from './tables/week-table/week-table.component';

import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
  	CommonModule, 
  	RouterModule, 
  	NgbModule, 
  	MatDatepickerModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    NgbCollapseModule,
  ],
  declarations: [
  	FooterComponent, 
  	NavbarComponent, 
  	SidebarComponent, 
  	ProjectsTableComponent, 
  	ResourcesTableComponent, 
  	PlanningTableComponent, 
  	RequestTableComponent, 
  	ProfileInfoComponent, 
  	ProfilesTableComponent, 
  	CompetencesTableComponent, 
  	PlanningCellComponent, 
  	DatepickerComponent, 
  	GridParametersComponent, 
  	ViewsComponent, 
  	PlanningRowComponent, 
  	PlanningTaskComponent, 
  	AlertComponent, 
  	ResourcesTableFullComponent, 
  	FilterPipe, 
  	KeysPipe,
  	CountTaskPipePipe, 
    CountSubprojectPipePipe,
    CountProjectPipePipe,
  	ResourcePlanningTableComponent, 
  	TodoTableComponent, 
  	FilterComponent, 
  	NeedProjectTableComponent, 
  	NeedTeamTableComponent, 
  	AvailabilityTableComponent, 
  	WeekTableComponent, 
  	CalendarWeeksComponent, 
    MessageComponent,
    
  	CreateProjectModalComponent,
  	CreateRequestModalComponent,
  	CreateProfileModalComponent,
  	CreateResourceModalComponent,
  	CreateCompetenceModalComponent,
    AddResourceToProjectModalComponent,
    DeleteModalComponent,
  	UpdateRequestModalComponent,
    CreateSubprojectModalComponent,
    CreateTodoItemModalComponent,
    AddResourceToProjectModalComponent,
    CreateNeedModalComponent,
    CreateAvailabilityModalComponent, 
    
  ],
  exports: [
  	FooterComponent, 
  	NavbarComponent, 
  	SidebarComponent, 
  	ProjectsTableComponent, 
  	ResourcesTableComponent, 
  	PlanningTableComponent, 
  	ProfileInfoComponent, 
  	RequestTableComponent,
  	NeedTeamTableComponent,
  	NeedProjectTableComponent,
  	AvailabilityTableComponent,
  	TodoTableComponent,
  	ProfilesTableComponent,
  	CompetencesTableComponent,
  	ResourcesTableFullComponent,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    CountTaskPipePipe,
    CountSubprojectPipePipe,
  	CountProjectPipePipe,
  	FilterPipe,
  	KeysPipe,
  ],
  providers: [
  	DatePipe,
  	KeysPipe
  ],
  entryComponents: [
  	CreateProjectModalComponent,
  	CreateResourceModalComponent,
  	CreateRequestModalComponent,
  	CreateTodoItemModalComponent,
  	DeleteModalComponent,
  	PlanningRowComponent,
  ],
  bootstrap:    [ ProjectsTableComponent ]
})
export class ComponentsModule {}
