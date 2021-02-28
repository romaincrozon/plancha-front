import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common'

import { DataSharingService } from '../../services/data-sharing.service';
import { CalendarRange } from '../../models/calendar-range.model';
import { GridParameters } from '../../models/grid-parameters.model';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-grid-parameters',
  templateUrl: './grid-parameters.component.html'
})
export class GridParametersComponent implements OnInit {
  	
  	startDate : string ;
  	endDate : string ;
  	view : string ;
  	selectedProjects : Project[];
  	gridParameterGroup: FormGroup;
  	
  	@Input() projects: Project[];
  	
  	constructor(private fb:FormBuilder, 
  		public dataSharingService: DataSharingService, 
  		private datepipe: DatePipe) {}

 	ngOnInit(): void {
    	this.initializeForm();
 	}

  	initializeForm(){
    	this.gridParameterGroup = this.fb.group({
      		startDate:[''],
      		endDate:[''],
      		view:'days',
      		searchText:'',
      		projects: null
    	});
    	this.gridParameterGroup.valueChanges.subscribe(value => {
      		this.endDate = value.endDate;
      		this.startDate = value.startDate;
      		this.view = value.view;
      		this.selectedProjects = value.projects;
    	})
  	}
  	
  	submitForm() {
    	if (this.startDate && this.endDate && this.view && this.selectedProjects){
    		this.dataSharingService.gridParameters.next(new GridParameters(new CalendarRange(this.datepipe, this.startDate, this.endDate), this.view, this.selectedProjects));
    	}
  	}
}
