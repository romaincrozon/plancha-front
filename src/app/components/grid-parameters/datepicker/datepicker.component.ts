import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html'
})
export class DatepickerComponent{

	@Input() parentForm:FormGroup;
  	
  	constructor(private fb:FormBuilder) { 
  	}
  
  	ngOnInit(): void {
  		
  	}
 
}