import { Component, OnInit, Input , NgModule, ComponentFactory, ComponentRef, ComponentFactoryResolver, ViewContainerRef, ChangeDetectorRef, TemplateRef, ViewChild, Output, EventEmitter} from '@angular/core'
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Task } from '../../models/task.model';
import { GridParameters } from '../../models/grid-parameters.model';
import { Resource } from '../../models/resource.model';
import { TaskResource } from '../../models/task-resource.model';

import { PlanningRowComponent } from '../planning-row/planning-row.component';

import { ResourceCalendarService } from '../../services/resource-calendar/resource-calendar.service';

@Component({
  selector: '[app-planning-task]',
  templateUrl: './planning-task.component.html'
})
export class PlanningTaskComponent implements OnInit {

	@Input() tasks: Task[];
	@Input() gridParameters: GridParameters[]
	@Input() projectResources: Resource[];
	
  	availableResources : Resource[] = [];
  	selectResourceForm: FormGroup;
  
  	@ViewChild("planningRowContainer", { read: ViewContainerRef }) container;
	componentRef: ComponentRef<any>;
  
  	constructor(private formBuilder: FormBuilder, 
  		private resolver: ComponentFactoryResolver,
  		private resourceCalendarService: ResourceCalendarService) {}

  	ngOnInit(): void {
  		this.createForm();
  	}
	
	private createForm() {
    	this.selectResourceForm = this.formBuilder.group({
      		selectResources: null,
    		taskId: null,
    	});
  	}
  	
	createComponent(task, resource) {
    	this.container.clear();
    	const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(PlanningRowComponent);
    	this.componentRef = this.container.createComponent(factory);
    	this.componentRef.instance.projectResources = this.projectResources;
		this.componentRef.instance.task = task;
		this.componentRef.instance.gridParameters = this.gridParameters;
		this.componentRef.instance.resource = resource;
	}
    
  	private onResourceSelected(resource){
  		var resourceCalendarToCreate = new TaskResource(null);
  		var task = this.getTaskById(this.selectResourceForm.value.taskId);
  		
  		resourceCalendarToCreate.resourceId = resource;
  		resourceCalendarToCreate.taskId = this.selectResourceForm.value.taskId;
  		console.log("resourceCalendarToCreate:" + resourceCalendarToCreate);
  		this.resourceCalendarService.createResourceCalendarFromTaskAndResource(resourceCalendarToCreate).subscribe(data => {
			this.createComponent(task, resource);
		});
  	}
    
    getAvailableResources(task){
    	if(this.projectResources != null && this.tasks != null){
		  	let projectResourceIds = this.projectResources.map(item => item.id);
			let taskResourceIds = task.resourceCalendars.map(item => item.resource?.id);
			
			this.availableResources = projectResourceIds.map((id, index) => {
			if (taskResourceIds.indexOf(id) < 0) {
	            return this.projectResources[index];
	        }
		    }).concat(taskResourceIds.map((id, index) => {
		        if (projectResourceIds.indexOf(id) < 0) {
		            return task.resourceCalendars[index].resource;
		        }
		    })).filter(item => item != undefined);
		    console.log(this.availableResources);
		}
    }
  	
    ngOnDestroy() {
		this.componentRef.destroy();    
    }
    
	getTaskById(taskId){
		let item = this.tasks.find(node => node.id == taskId);
		return item;
	}
    
}
