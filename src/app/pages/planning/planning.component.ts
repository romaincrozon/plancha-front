import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { ProjectService } from '../../services/project.service';
import { DataSharingService } from '../../services/data-sharing.service';

import { Project } from '../../models/project.model';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html'
})
export class PlanningComponent implements OnInit {

	projects: Project[];
	calendar: any;
	
  	constructor(public calendarService: CalendarService,
  		public projectService: ProjectService,
  		public dataSharingService: DataSharingService
  	) { }

  	ngOnInit() {
  		/*this.dataSharingService.gridParameters.subscribe( value => {
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
	    });*/
  	}
}
