import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { DatePipe } from '@angular/common'

import { FooterComponent } from "./footer/footer.component"; 
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { ProjectsTableComponent } from './projects-table/projects-table.component';
import { ResourcesTableComponent } from './resources-table/resources-table.component';
import { PlanningTableComponent } from './planning-table/planning-table.component';
import { RequestTableComponent } from './request-table/request-table.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { ProfilesTableComponent } from './profiles-table/profiles-table.component';
import { CompetencesTableComponent } from './competences-table/competences-table.component';
import { PlanningCellComponent } from './planning-cell/planning-cell.component';
import { DatepickerComponent } from './grid-parameters/datepicker/datepicker.component';
import { GridParametersComponent } from './grid-parameters/grid-parameters.component';
import { ViewsComponent } from './grid-parameters/views/views.component';
import { PlanningRowComponent } from './planning-row/planning-row.component';
import { PlanningTaskComponent } from './planning-task/planning-task.component';
import { AlertComponent } from './alert/alert.component';
import { ResourcesTableFullComponent } from './resources-table-full/resources-table-full.component';
import { CountTaskPipePipe } from '../pipes/count-task-pipe.pipe';

@NgModule({
  imports: [
  	CommonModule, 
  	RouterModule, 
  	NgbModule, 
  	MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    ReactiveFormsModule
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
  	CountTaskPipePipe
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
  	ProfilesTableComponent,
  	ResourcesTableFullComponent,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    CountTaskPipePipe
  ],
  providers: [
  	DatePipe
  ],
})
export class ComponentsModule {}
