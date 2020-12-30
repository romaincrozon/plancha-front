import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatDatepickerModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatRippleModule } from '@angular/material';

import { FooterComponent } from "./footer/footer.component"; 
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { ProjectsTableComponent } from './projects-table/projects-table.component';
import { ResourcesTableComponent } from './resources-table/resources-table.component';
import { PlanningTableComponent } from './planning-table/planning-table.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { RequestTableComponent } from './request-table/request-table.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { ProfilesTableComponent } from './profiles-table/profiles-table.component';
import { CompetencesTableComponent } from './competences-table/competences-table.component';
import { PlanningCellComponent } from './planning-cell/planning-cell.component';
import { DatepickerComponent } from './datepicker/datepicker.component';

@NgModule({
  imports: [
  	CommonModule, 
  	RouterModule, 
  	NgbModule, 
  	MatDatepickerModule, 
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,],
  declarations: [
  	FooterComponent, 
  	NavbarComponent, 
  	SidebarComponent, 
  	ProjectsTableComponent, 
  	ResourcesTableComponent, 
  	PlanningTableComponent, 
  	DatePickerComponent, 
  	RequestTableComponent, 
  	ProfileInfoComponent, 
  	ProfilesTableComponent, 
  	CompetencesTableComponent, 
  	PlanningCellComponent, 
  	DatepickerComponent
  ],
  exports: [
  	FooterComponent, 
  	NavbarComponent, 
  	SidebarComponent, 
  	ProjectsTableComponent, 
  	ResourcesTableComponent, 
  	PlanningTableComponent, 
  	DatePickerComponent,
  	RequestTableComponent,
  	ProfilesTableComponent,
  	CompetencesTableComponent
  ]
})
export class ComponentsModule {}
