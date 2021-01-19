import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataSharingService } from '../../services/data-sharing/data-sharing.service';
import { CalendarRange } from '../../models/calendar-range.model';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html'
})
export class DatepickerComponent {

	dateSelectorGroup:FormGroup;
  	startDate : string ;
  	endDate : string ;
 
  	calendarRange: CalendarRange;

  	constructor(private fb:FormBuilder, public dataSharingService: DataSharingService) {
  	}
  
  	ngOnInit(): void {
    	this.initializeForm();
  	}
 
  	initializeForm(){
    	this.dateSelectorGroup = this.fb.group({
      		startDate:[''],
      		endDate:['']
    	});
 
    	this.dateSelectorGroup.controls.startDate.valueChanges.subscribe(value => {
	      	if(value){
	        	this.startDate = value;
	      	} else{
	        	this.startDate = ""
	      	}
    	});
 
	    this.dateSelectorGroup.controls.endDate.valueChanges.subscribe(value => {
      		if(value){
        		this.endDate = value;
      		} else{
        		this.endDate = ""
      		}
    	})
  	}
  	
  	submitForm() {
    	if (this.startDate != null && this.endDate != null){
    		console.log("Start:" + this.startDate + "|End:" + this.endDate); 
    		this.dataSharingService.calendarRange.next(new CalendarRange(this.startDate, this.endDate));
    	}
  	}
}