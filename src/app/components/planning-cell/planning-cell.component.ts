import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { ResourceCalendar } from '../../models/resource-calendar.model';
import { CalendarItem } from '../../models/calendar-item.model';
import { CalendarItemService } from '../../services/calendar-item/calendar-item.service';

@Component({
  selector: 'app-planning-cell',
  templateUrl: './planning-cell.component.html'
})
export class PlanningCellComponent implements OnInit {

  @Input() resourceCalendar: ResourceCalendar;
  @Input() calendarItem: CalendarItem;
  @Input() date: any;
  createCellForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private calendarItemService: CalendarItemService) {
  }

  ngOnInit(): void {
  	this.createForm();
  }

	
  private createForm() {
    this.createCellForm = this.formBuilder.group({
      id: [this.calendarItem?.id],
      calendar: [this.date.calendar],
      value: [this.calendarItem?.value, { updateOn: 'blur' }],
      holiday: [this.date.holiday]
    },
    { updateOn: "blur" });
  }
  
  private submitForm(inputValue: number) {
  	var calendarItemToCreate = new CalendarItem(this.createCellForm.value);
  	calendarItemToCreate.value = inputValue;
  	calendarItemToCreate.resourceCalendar = this.resourceCalendar;
  	console.log(calendarItemToCreate );
	this.calendarItemService.createCalendarItem(calendarItemToCreate).subscribe(data => {
	  this.calendarItem = data;
	});
  }
}
