import { Component, Input, OnInit, EventEmitter, Output  } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Project } from '../../models/project.model';
import { Task } from '../../models/task.model';
import { SubProject } from '../../models/sub-project.model';
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
  selector: '[app-planning-row]',
  templateUrl: './planning-row.component.html'
})
export class PlanningRowComponent implements OnInit {

	@Input() gridParameters: GridParameters;
	@Input() resourceCalendar: ResourceCalendar;
	@Input() calendar: any;
	@Input() weeks: WeekItem[];
	@Input() offset: number;
	
	@Input() project: Project;
	@Input() subItem: Project;
	@Input() subSubItem: Project;
	
  	@Output() valueChange = new EventEmitter<any>();
	
  	constructor(private utilsService: UtilsService) { }

  	ngOnInit(): void { }
  	
	// getResourceById(resourceId){
	// 	if (resourceId != null){
	// 		let item = this.projectResources.find(node => node.id == resourceId);
	// 		return item;
	// 	}
	// }
	
	sum(cell) {
        this.valueChange.emit(cell);
    }
    
    getCellValue(date): CalendarItem {
    	if (this.resourceCalendar && this.resourceCalendar.calendarItems) {
			var calendar = this.utilsService.formatDate(date.calendar);
			let item = this.resourceCalendar.calendarItems.find(node => 
  				this.utilsService.formatDate(node.calendar) == calendar);
  			if (item){
    			return item;
    		}
    	} 
    	return date;
    }
}