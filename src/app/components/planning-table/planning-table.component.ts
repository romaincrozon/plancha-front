import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { CalendarService } from '../../services/calendar/calendar.service';
import { ProjectService } from '../../services/project/project.service';
import { CalendarItemService } from '../../services/calendar-item/calendar-item.service';
import { DataSharingService } from '../../services/data-sharing/data-sharing.service';

import { Project } from '../../models/project.model';
import { CalendarItem } from '../../models/calendar-item.model';
import { CalendarRange } from '../../models/calendar-range.model';
import { CalendarResourceTask } from '../../models/calendar-resource-task.model';
import { GridParameters } from '../../models/grid-parameters.model';

import { DirectiveAddresourceDirective } from '../../directives/directive-addresource.directive';
//import { ResourceCalendarItem } from '../../directives/items/resource-calendar-item';
import { ResourceCalendar } from '../../models/resource-calendar.model';
import { RowComponent } from '../row.component';

@Component({
  selector: 'app-planning-table',
  templateUrl: './planning-table.component.html'
})
export class PlanningTableComponent implements OnInit {

	//@Input() planningRowItems: PlanningRowItem[];
	//@ViewChild(DirectiveAddresourceDirective, {static: true}) appDirectiveAddresource: DirectiveAddresourceDirective;
	
	@Input() gridParameters: GridParameters;
	calendar: any;
	projects: Project[];
  
  	constructor(public calendarService: CalendarService, 
	  		public projectService: ProjectService, 
	  		public dataSharingService: DataSharingService) {
  	}

  	ngOnInit(): void {
	  	this.dataSharingService.gridParameters.subscribe( value => {
	        this.gridParameters = value;
	        if (this.gridParameters != null 
	        		&& this.gridParameters.calendarRange != null 
	        		&& this.gridParameters.calendarRange.startDate != null 
		        	&& this.gridParameters.calendarRange.endDate != null 
		        	&& this.gridParameters.view != null){
				this.calendarService.getCalendar(this.gridParameters.calendarRange).subscribe((data: {}) => {
					this.calendar = data;
				});
				this.projectService.getProjects().subscribe(data => {
					this.projects = data;
				});
			}
	    });
  	}
}
