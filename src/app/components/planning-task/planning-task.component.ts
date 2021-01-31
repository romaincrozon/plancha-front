import { Component, OnInit, Input , NgModule, ComponentFactory, ComponentRef, ComponentFactoryResolver, ViewContainerRef, ChangeDetectorRef, TemplateRef, ViewChild, Output, EventEmitter} from '@angular/core'
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Task } from '../../models/task.model';
import { GridParameters } from '../../models/grid-parameters.model';
import { Resource } from '../../models/resource.model';
import { TaskResource } from '../../models/task-resource.model';
import { WeekItem } from '../../models/week-item.model';
import { CalendarItem } from '../../models/calendar-item.model';

import { PlanningRowComponent } from '../planning-row/planning-row.component';

import { ResourceCalendarService } from '../../services/resource-calendar.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-planning-task',
  templateUrl: './planning-task.component.html'
})
export class PlanningTaskComponent implements OnInit {

	@Input() task: Task;
	@Input() gridParameters: GridParameters[];
	@Input() projectResources: Resource[];
	@Input() calendars: CalendarItem[];
	@Input() weeks: WeekItem[];
	
  	availableResources : Resource[] = [];
  	selectResourceForm: FormGroup;
  
  	constructor(private formBuilder: FormBuilder, 
  		private resolver: ComponentFactoryResolver,
  		private resourceCalendarService: ResourceCalendarService,
  		private utilsService: UtilsService) {}

  	ngOnInit(): void {
  		this.getAvailableResources();
  		this.createForm();
  	}
	
	private createForm() {
    	this.selectResourceForm = this.formBuilder.group({
      		selectResources: null,
    	});
  	}
  	
  	private onResourceSelected(resource){
  		if (resource > 0){
	  		var taskResourceToCreate = new TaskResource(null);
	  		console.log("rrrrr");
	  		taskResourceToCreate.resourceId = resource;
	  		taskResourceToCreate.taskId = this.task.id;
	  		this.resourceCalendarService.createResourceCalendarFromTaskAndResource(taskResourceToCreate).subscribe(data => {
				this.task.resourceCalendars.push(data);
				console.log(resource);
				var updatedAvailableResources = this.availableResources.map(item => {
					if (item.id != resource) { 
						return item;
					} else {
						return null;
					};
				}).filter(item => item != undefined);
				this.availableResources = updatedAvailableResources;
			   	this.selectResourceForm.controls['selectResources'].setValue(0);
			});
		}
  	}
    
    getAvailableResources(){
    	if(this.projectResources != null && this.task != null){
		  	let projectResourceIds = this.projectResources.map(item => item.id);
			let taskResourceIds = this.task.resourceCalendars.map(item => item.resource?.id);
			
			this.availableResources = projectResourceIds.map((id, index) => {
			if (taskResourceIds.indexOf(id) < 0) {
	            return this.projectResources[index];
	        }
		    }).concat(taskResourceIds.map((id, index) => {
		        if (projectResourceIds.indexOf(id) < 0) {
		            return this.task.resourceCalendars[index].resource;
		        }
		    })).filter(item => item != undefined);
		}
    }
}
