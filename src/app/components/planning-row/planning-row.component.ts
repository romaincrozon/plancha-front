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
import { WeekItem } from '../../models/week-item.model';

import { ResourceCalendarService } from '../../services/resource-calendar.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-planning-row',
  templateUrl: './planning-row.component.html'
})
export class PlanningRowComponent implements OnInit {

  	@Input() projectResources: Resource[];
	@Input() gridParameters: GridParameters;
	@Input() resourceCalendar: ResourceCalendar;
	@Input() calendars: CalendarItem[];
	@Input() weeks: WeekItem[];
	
  	constructor(private utilsService: UtilsService) { }

  	ngOnInit(): void { }
  	
	getResourceById(resourceId){
		if (resourceId != null){
			let item = this.projectResources.find(node => node.id == resourceId);
			return item;
		}
	}
}