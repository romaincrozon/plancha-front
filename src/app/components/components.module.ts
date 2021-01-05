import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

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
import { DatepickerComponent } from './datepicker/datepicker.component';

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
  	DatepickerComponent
  ],
  exports: [
  	FooterComponent, 
  	NavbarComponent, 
  	SidebarComponent, 
  	ProjectsTableComponent, 
  	ResourcesTableComponent, 
  	PlanningTableComponent, 
  	RequestTableComponent,
  	ProfilesTableComponent,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule
  ]
})
export class ComponentsModule {}
