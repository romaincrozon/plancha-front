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

@Component({
  selector: 'app-planning-cell',
  templateUrl: './planning-cell.component.html'
})
export class PlanningCellComponent implements OnInit {

  	@Input() resourceCalendar: ResourceCalendar;
  	@Input() view: string;  	
  	@Input() calendarItem: CalendarItem;
  	@Input() week: any;
  	
  	@Input() project: Project;
	@Input() subproject: SubProject;
	@Input() task: Task;
	
  	@Output() valueChange = new EventEmitter<any>();
  	
  	cellForm: FormGroup;
  	calendarItems: CalendarItem[];
  
  	constructor(private formBuilder: FormBuilder, 
  		private calendarItemService: CalendarItemService, 
  		private utilsService: UtilsService) {}

  	ngOnInit(): void {
  		this.createForm();
  		this.fillCell();
  	}

	
  	private createForm() {
    	this.cellForm = this.formBuilder.group({
      		value: new FormControl(this.calendarItem.value ? this.calendarItem.value : 0)
    	});
  	}
  
  	private submitForm(inputValue: number) {
		if (this.view == 'days'){
	  		var calendarItemToCreate = new CalendarItem(this.cellForm.value);
	  		calendarItemToCreate.id = this.calendarItem.id;
	  		calendarItemToCreate.calendar = this.calendarItem.calendar;
	  		calendarItemToCreate.resourceCalendarId = this.resourceCalendar.id;
  			this.calendarItemService.createCalendarItem(calendarItemToCreate).subscribe(data => {
			  	let index = this.resourceCalendar.calendarItems.findIndex(calendarItem => this.utilsService.formatDate(calendarItem.calendar) === this.utilsService.formatDate(this.calendarItem.calendar));
			  	if (index > -1){
				  	this.resourceCalendar[index] = data;
			  	} else {
			  		this.resourceCalendar.calendarItems.push(data);
			  	}
			  	let diffValue = data.value - (this.calendarItem.value ? this.calendarItem.value : 0);
			  	this.valueChange.emit({calendar:this.calendarItem.calendar, 
			  		value:diffValue, 
			  		projectId: this.project.id, 
			  		subprojectId: this.subproject.id, 
			  		taskId: this.task.id
			  	});
			});
		}else{
  			var weekItemToCreate = new WeekItem();
  			var calendars = new Array();
  			this.week.planchaCalendars.forEach(function (planchaCalendar) {
			    calendars.push(planchaCalendar.calendar);
			});
  			weekItemToCreate.calendars = calendars;
  			weekItemToCreate.resourceCalendarId = this.resourceCalendar.id;
  			weekItemToCreate.value = this.cellForm.value.value;
  			this.calendarItemService.createWeekItem(weekItemToCreate).subscribe(data => {
				this.calendarItems = data;
			});
		}
  	}
  	
  	fillCell(){
		if (this.view == 'days'){
    		this.cellForm.controls['value'].setValue(this.calendarItem.value);
    	} else {
    		//this.cellForm.controls['value'].setValue(this.calendarItem.value);
		}
  	}
}