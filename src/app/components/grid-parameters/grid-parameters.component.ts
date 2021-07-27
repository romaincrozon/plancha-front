import { Component, OnInit, Input } from '@angular/core';
import { AfterViewChecked, ChangeDetectorRef } from '@angular/core'
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
export class GridParametersComponent implements OnInit, AfterViewChecked{
  	
  	startDate : string ;
  	endDate : string ;
  	view : string ;
  	selectedProjects : Project[];
  	gridParameterGroup: FormGroup;
  	currentDate = new Date();
  	
  	@Input() projects: Project[];
  	
  	constructor(private readonly changeDetectorRef: ChangeDetectorRef, 
  		private fb:FormBuilder, 
  		public dataSharingService: DataSharingService, 
  		private datepipe: DatePipe) {}

 	ngOnInit(): void {
    	this.initializeForm();
 	}

  	initializeForm(){
  		let currentDate = new Date();
  		currentDate.setMonth(currentDate.getMonth()+1);
     	let formattedDate=currentDate.toISOString().slice(0,10);

    	this.gridParameterGroup = this.fb.group({
      		startDate: [new Date()],
      		endDate: [formattedDate],
      		view:'days',
      		searchText:'',
      		projects: null
    	});
    	this.gridParameterGroup.valueChanges.subscribe(value => {
      		this.endDate = value.endDate;
      		this.startDate = value.startDate;
      		this.view = value.view;
      		this.selectedProjects = value.projects;
      		this.submitForm();
    	})
  	}
  	
  	submitForm() {
    	if (this.startDate && this.endDate && this.view && this.selectedProjects){
    		this.dataSharingService.gridParameters.next(new GridParameters(new CalendarRange(this.datepipe, this.startDate, this.endDate), this.view, this.selectedProjects));
    	}
  	}
  	
  	ngAfterViewChecked(): void {
    	this.changeDetectorRef.detectChanges();
  	}
 
}
