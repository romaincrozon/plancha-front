import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calendar/calendar.service';
import { ProjectService } from '../../services/project/project.service';
import { TaskService } from '../../services/task/task.service';
import { DataSharingService } from '../../services/data-sharing/data-sharing.service';

import { Project } from '../../models/project.model';
import { CalendarItem } from '../../models/calendar-item.model';
import { CalendarRange } from '../../models/calendar-range.model';

@Component({
  selector: 'app-planning-table',
  templateUrl: './planning-table.component.html'
})
export class PlanningTableComponent implements OnInit {

	calendar: any;
	projects: Project[];
	calendarRange: CalendarRange;
  
  	constructor(public calendarService: CalendarService, 
	  		public projectService: ProjectService, 
	  		public taskService: TaskService,
	  		public dataSharingService: DataSharingService) {
  	}

  	ngOnInit(): void {
	  	this.dataSharingService.calendarRange.subscribe( value => {
	        this.calendarRange = value;
	        if (this.calendarRange != null 
	        		&& this.calendarRange.startDate != null 
		        	&& this.calendarRange.endDate != null){
				console.log(this.calendarRange);
				this.calendarService.getCalendar(this.calendarRange).subscribe((data: {}) => {
					this.calendar = data;
				});
				this.projectService.getProjectsByDate(this.calendarRange).subscribe(data => {
					this.projects = data;
				});
			}
	    });
  	}
  	
  	isInDatabase(date: any, calendarItems: CalendarItem[]){
  		for(var calendarItem of calendarItems){
  			console.log(calendarItem.calendar + "||" + date.calendar )
  			if (calendarItem.calendar == date.calendar){
  				return calendarItem;
  			}
  		}
  		return null;
  	}
}
