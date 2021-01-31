import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'

import { ResourceCalendar } from '../../models/resource-calendar.model';
import { CalendarItem } from '../../models/calendar-item.model';
import { CalendarItemService } from '../../services/calendar-item.service';
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
	  		calendarItemToCreate.resourceCalendarId = this.resourceCalendar.id;
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
  			weekItemToCreate.resourceCalendarId = this.resourceCalendar.id;
  			weekItemToCreate.value = this.cellForm.value.value;
  			//console.log(weekItemToCreate);
  			this.calendarItemService.createWeekItem(weekItemToCreate).subscribe(data => {
				this.calendarItems = data;
			});
		}
  	}
  	
  	fillCell(){
		if (this.resourceCalendar != null && this.resourceCalendar.calendarItems != null) {
  			//console.log("calendarItems != null");
			var resourceCalendarId = this.resourceCalendar.id;
  			var date = this.datepipe.transform(this.calendarItem.calendar, 'yyyy-MM-dd');
  			//console.log(this.resourceCalendar);
  			//if (this.resourceCalendar.calendarItems instanceof CalendarItem[]){
	  			let item = this.resourceCalendar.calendarItems.find(node => 
	  				this.datepipe.transform(node.calendar, 'yyyy-MM-dd') == date);
			//} else if (this.resourceCalendar.calendarItems instanceof CalendarItem){
	  		//	let item = this.resourceCalendar.calendarItems;
			//}
			if (item != null){
				if (this.view == 'days'){
		    		this.cellForm.controls['value'].setValue(item.value);
		    	} else {
		    		//this.cellForm.controls['value'].setValue(item.value);
				}
			}
  		}
  	}
}