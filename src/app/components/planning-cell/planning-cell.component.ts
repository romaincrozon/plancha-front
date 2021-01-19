import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'

import { ResourceCalendar } from '../../models/resource-calendar.model';
import { CalendarItem } from '../../models/calendar-item.model';
import { CalendarItemService } from '../../services/calendar-item/calendar-item.service';
import { CalendarResourceTask } from '../../models/calendar-resource-task.model';
import { WeekItem } from '../../models/week-item.model';

@Component({
  selector: 'app-planning-cell',
  templateUrl: './planning-cell.component.html'
})
export class PlanningCellComponent implements OnInit {

  	@Input() calendarResourceTasks: CalendarResourceTask[];
  	@Input() calendarItem: CalendarItem;
  	@Input() view: string;
  	@Input() week: any;
  	cellForm: FormGroup;
  	calendarItems: CalendarItem[];
  
  	constructor(private formBuilder: FormBuilder, 
  		private calendarItemService: CalendarItemService, 
  		private datepipe: DatePipe) {}

  	ngOnInit(): void {
  		this.createForm();
  		this.fillCell();
  	}

	
  	private createForm() {
    	this.cellForm = this.formBuilder.group({
      		value: null,//this.calendarItem.value,
    	});
  	}
  
  	private submitForm(inputValue: number) {
		if (this.view == 'days'){
	  		var calendarItemToCreate = new CalendarItem(this.cellForm.value);
	  		calendarItemToCreate.id = this.calendarItem.id;
	  		calendarItemToCreate.calendar = this.calendarItem.calendar;
	  		calendarItemToCreate.resourceCalendarId = this.calendarResourceTasks[0].resourceCalendarId;
	  		//calendarItemToCreate.resourceCalendarId = this.calendarItem.resourceCalendarId;
  			this.calendarItemService.createCalendarItem(calendarItemToCreate).subscribe(data => {
			  	this.calendarItem = data;
			});
		}else{
  			var weekItemToCreate = new WeekItem();
  			var calendars = new Array();
  			this.week.planchaCalendars.forEach(function (planchaCalendar) {
			    calendars.push(planchaCalendar.calendar);
			});
  			weekItemToCreate.calendars = calendars;
  			//weekItemToCreate.resourceCalendarId = this.resourceCalendarId;
  			weekItemToCreate.resourceCalendarId = this.calendarResourceTasks[0].resourceCalendarId;
  			weekItemToCreate.value = this.cellForm.value.value;
  			console.log(weekItemToCreate);
  			this.calendarItemService.createWeekItem(weekItemToCreate).subscribe(data => {
				this.calendarItems = data;
			});
		}
  	}
  	
  	fillCell(){
  		if (this.calendarResourceTasks != null && this.view == 'days'){
  			var resourceCalendarId = this.calendarResourceTasks[0].resourceCalendarId;
  			var date = this.datepipe.transform(this.calendarItem.calendar, 'yyyy-MM-dd');
  			let item = this.calendarResourceTasks.find(node => 	
				node.resourceCalendarId == resourceCalendarId
  				&& this.datepipe.transform(node.calendar, 'yyyy-MM-dd') == date);
		    if (item != null){
		    	this.cellForm.controls['value'].setValue(item.value);
  		    }
  		}
  	}
}