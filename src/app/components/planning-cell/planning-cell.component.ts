import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'

import { Project } from '../../models/project.model';
import { Task } from '../../models/task.model';
import { SubProject } from '../../models/sub-project.model';
import { ResourceCalendar } from '../../models/resource-calendar.model';
import { CalendarItem } from '../../models/calendar-item.model';
import { CalendarItemService } from '../../services/calendar-item.service';
import { UtilsService } from '../../services/utils.service';
import { CalendarResourceTask } from '../../models/calendar-resource-task.model';
import { WeekItem } from '../../models/week-item.model';
import { Resource } from 'src/app/models/resource.model';

@Component({
  selector: 'app-planning-cell',
  templateUrl: './planning-cell.component.html'
})
export class PlanningCellComponent implements OnInit {

	@Input() resourceCalendar: ResourceCalendar;
  	@Input() calendarItem: CalendarItem;
  	@Input() week: any;
  	
  	@Input() project: Project;
  	@Input() subItem: Project;
  	@Input() subSubItem: Project;
  	@Output() valueChange = new EventEmitter<any>();

  	currentProject: Project;	
  	cellForm: FormGroup;
  	calendarItems: CalendarItem[];
  
  	constructor(private formBuilder: FormBuilder, 
  		private calendarItemService: CalendarItemService) {}

  	ngOnInit(): void {
		this.currentProject.id = this.subSubItem ? this.subSubItem.id : this.subItem ? this.subItem.id : this.project.id;
		
  		this.createForm();
  	}

	
  	private createForm() {
    	this.cellForm = this.formBuilder.group({
      		value: new FormControl(this.calendarItem ? this.calendarItem.value ? this.calendarItem.value : 0 : 0)
    	});
  	}
  
  	private submitForm(inputValue: number) {
		console.log("submit cell")
		let currentValue = this.calendarItem.value;
		let newResourceCalendar = new ResourceCalendar();
		let calendars = new Array();
		if (!this.calendarItem)
			this.calendarItem = new CalendarItem();
		this.calendarItem.value = this.cellForm.value.value;
		calendars.push(this.calendarItem);
		
		let resource = new Resource();
		resource.id = this.resourceCalendar.resource + "";

		newResourceCalendar.project = this.currentProject;

		newResourceCalendar.resource = resource;
		newResourceCalendar.calendarItems = calendars;
		console.log("newResourceCalendar")
		console.log(newResourceCalendar)
		this.calendarItemService.createResourceCalendar(newResourceCalendar).subscribe(data => {
			this.calendarItems = data.calendarItems; 
			this.valueChange.emit({ 
				calendar:this.calendarItem.calendar, 
				value: inputValue - currentValue, 
				projectId: this.project.id,
				subItemId: this.subItem? this.subItem.id : null, 
				subSubItemId: this.subSubItem? this.subSubItem.id : null
			});
		});
  	}
}