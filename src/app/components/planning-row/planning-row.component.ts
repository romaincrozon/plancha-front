import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Project } from '../../models/project.model';
import { Task } from '../../models/task.model';
import { CalendarItem } from '../../models/calendar-item.model';
import { CalendarRange } from '../../models/calendar-range.model';
import { GridParameters } from '../../models/grid-parameters.model';
import { ResourceCalendar } from '../../models/resource-calendar.model';
import { Resource } from '../../models/resource.model';
import { TaskResource } from '../../models/task-resource.model';

import { ResourceCalendarService } from '../../services/resource-calendar/resource-calendar.service';

@Component({
  selector: '[app-planning-row]',
  templateUrl: './planning-row.component.html'
})
export class PlanningRowComponent implements OnInit {

  	@Input() projectResources: Resource[];
	@Input() task: Task;
	@Input() gridParameters: GridParameters;
	@Input() resource: Resource;
	
	//resourceCalendars: ResourceCalendar[];
  	//idTaskResources : number[] = [];
  	//selectResourceForm: FormGroup;
  	
  	constructor(private formBuilder: FormBuilder, public resourceCalendarService: ResourceCalendarService) { }

  	ngOnInit(): void {
	  	/*if(this.projectResources != null && this.task.resourceCalendars != null){
		  	let ids1 = this.projectResources.map(item => item.id);
			let ids2 = this.task.resourceCalendars.map(item => item.resource?.id);
			this.availableResources = ids1.map((id, index) => {
			if (ids2.indexOf(id) < 0) {
	            return this.projectResources[index];
	        }
		    }).concat(ids2.map((id, index) => {
		        if (ids1.indexOf(id) < 0) {
		            return this.task.resourceCalendars[index].resource;
		        }
		    })).filter(item => item != undefined);
		}*/
  	}
  	
  	  	
	getResourceById(resourceId){
		console.log(this.projectResources);
		let item = this.projectResources.find(node => node.id == resourceId);
		return item;
	}


}