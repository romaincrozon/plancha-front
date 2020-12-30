import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

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

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule],
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
  	CompetencesTableComponent, PlanningCellComponent
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
