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
  	
  	@Input() projects;
  	
  	startDate : string ;
  	endDate : string ;
  	view : string ;
  	selectedProjects : Project[];
  	gridParameterGroup: FormGroup;
  	
  	selectedCount:number = 0;
  	searchText: string = "";
  	filterActivated: boolean = false;
  	
  	
  	constructor(private readonly changeDetectorRef: ChangeDetectorRef, 
  		private fb:FormBuilder, 
  		public dataSharingService: DataSharingService, 
  		private datepipe: DatePipe) {}

 	ngOnInit(): void {
    	this.initializeForm();
    }

  	initializeForm(){
  		let currentDate = new Date();
  		currentDate.setMonth(currentDate.getMonth()+6);
     	let formattedDate=currentDate.toISOString().slice(0,10);

    	this.gridParameterGroup = this.fb.group({
      		startDate: [new Date()],
      		endDate: [formattedDate],
      		view:'weeks',
      		searchText:'',
      		projects: null
    	});
    	this.gridParameterGroup.valueChanges.subscribe(value => {
      		this.endDate = value.endDate;
      		this.startDate = value.startDate;
      		this.view = value.view;
      		this.selectedProjects = value.projects;
      		this.submitForm();
    	});
  	}
  	
  	submitForm() {
    	if (this.startDate && this.endDate && this.view){
    		if (this.selectedProjects){
    			this.dataSharingService.gridParameters.next(new GridParameters(new CalendarRange(this.datepipe, this.startDate, this.endDate), this.view, this.selectedProjects));
    		}else{
    			console.log(this.projects);
    			this.dataSharingService.gridParameters.next(new GridParameters(new CalendarRange(this.datepipe, this.startDate, this.endDate), this.view, this.projects));
    		}
    	}
  	}
  	
  	ngAfterViewChecked(): void {
  		//this.selectAll();
    	this.changeDetectorRef.detectChanges();
  	}
	
	updateFilter(selectedProjects: Project[]){ this.projects = selectedProjects; }
  	
  	//---------------------------------------------------------------------------
  	// Filter
  	getSelected(){
  		if ( this.projects ){
	    	this.selectedProjects = this.projects.filter(project => {
	          return project.selected;
	        });
	    	this.selectedCount = this.selectedProjects.length; 
	    	
	    	this.gridParameterGroup.patchValue({
			  projects: this.selectedProjects 
			});
		}
	}
  
  	// Clearing All Selections
  	clearSelection(){
    	this.searchText = "";
    	this.projects =  this.projects.filter(project => {
        	project.selected = false;
        	return true;
    	});
    	this.getSelected();    
  	}
  
  	selectAll(){
  		if (this.projects){
  			console.log("toto");
	    	this.projects = this.projects.forEach(function(project) {
	        	project.selected = true;
	        });
	    	this.getSelected();    
  		}
  	}
  
  	deleteSelected(id:string){
    	this.searchText = "";
    	this.projects =  this.projects.filter(project => {
        if(project.id == id)
         	project.selected = false;
          	return true;
        });
    	this.getSelected(); 
  	}
  
  	clearFilter(){
    	this.searchText = "";
  	}
  	
  	toggle(){
  		this.filterActivated = !this.filterActivated;
  	}
}
