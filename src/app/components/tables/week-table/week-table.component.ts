import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CalendarService } from '../../../services/calendar.service';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-week-table',
  templateUrl: './week-table.component.html'
})
export class WeekTableComponent implements OnInit {

	@Input() list: any;
	calendar: any;
  	weeksShown: any;
  	index : number;
  	
  	weekForm: FormGroup;
  	numberOfDays: number;
	
  	constructor(private calendarService: CalendarService, public utilsService: UtilsService, private formBuilder: FormBuilder) {
    	this.index = 0;
    	this.createForm();
  	}

 	ngOnInit(): void {
 		this.calendarService.getWeekCalendar().subscribe(data => {
			this.calendar = data;
			this.setShownData();
		});
  	}

	private createForm() {
    	this.weekForm = this.formBuilder.group({
      		numberOfDays: null
		});
	}
	
	private setShownData(){
    	this.weeksShown = this.calendar.weekList.slice(this.index, this.index+4);
	}

	private previous() {
    	if(this.index != 0) {
      		this.index = this.index - 1;
      		this.setShownData();
    	}
	}

	private next() {
    	if( this.index + 1 < this.calendar.weekList.length){
      		this.index = this.index + 1;
      		this.setShownData();
    	}
	}
	
	private getValue(item: any, week: any): number{
		let utils = this.utilsService;
		let value = 0; 
		week.planchaCalendars.forEach(function (planchaCalendar) {
			let calendarValue = item.calendarValues.find(node => {
  				return utils.formatDate(node.calendar) == utils.formatDate(planchaCalendar.calendar);
  			});
  			if (calendarValue != null){
  				value += calendarValue.value;
			}
		});
		return value;
	}

	private dispatch(){
		if (this.numberOfDays != null){
			let tempNumberOfDays = this.numberOfDays;
			for(let key in this.calendar.weekList) {
				this.calendar.weekList[key].value = "";
				if (tempNumberOfDays > 0){
					let numberOfDaysToSet = 0;
					numberOfDaysToSet = tempNumberOfDays > this.calendar.weekList[key].numberOfDays ? this.calendar.weekList[key].numberOfDays : tempNumberOfDays; 
					tempNumberOfDays -= numberOfDaysToSet;
					this.calendar.weekList[key].value = numberOfDaysToSet;
				}
			}
		}
	}
}
