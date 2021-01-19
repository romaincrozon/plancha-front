import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Resource } from '../../models/resource.model';
import { ResourceCalendar } from '../../models/resource-calendar.model';
import { Task } from '../../models/task.model';
import { ResourceCalendarService } from '../../services/resource-calendar/resource-calendar.service';

@Component({
  selector: 'app-planning-addresource',
  templateUrl: './planning-addresource.component.html'
})
export class PlanningAddresourceComponent implements OnInit {

  	@Input() projectResources: Resource[];
  	@Input() task: Task;
  	@Input() resourceCalendars : ResourceCalendar[];
  	
  	availableResources : Resource[] = [];
  	idTaskResources : number[] = [];
  	selectResourceForm: FormGroup;
  	//resourceCalendar : ResourceCalendar;
  	
  	constructor(private formBuilder: FormBuilder, private resourceCalendarService: ResourceCalendarService) {
  	}

  	ngOnInit(): void {
  		console.log(this.task.resourceCalendars);
	  	if(this.projectResources != null && this.task.resourceCalendars != null){
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
		}
  		this.createForm();
  	}
  	
  	private createForm() {
    	this.selectResourceForm = this.formBuilder.group({
      		selectResources: null,
    	});
  	}
  	
  	private onResourceSelected(resource){
  		var resourceCalendarToCreate = new ResourceCalendar(null);
  		resourceCalendarToCreate.task = this.task;
  		resourceCalendarToCreate.resource = this.getResourceById(resource);
  		resourceCalendarToCreate.resource.projects = null;
  		this.resourceCalendarService.createResourceCalendar(resourceCalendarToCreate).subscribe(data => {
			console.log(this.resourceCalendars);
		});
  	}
  	
	getResourceById(resourceId){
		let item = this.projectResources.find(node => node.id == resourceId);
		return item;
	}
}