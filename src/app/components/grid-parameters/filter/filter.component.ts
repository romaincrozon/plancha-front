import { OnInit, Input } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';  
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, NgModule, VERSION } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FilterPipe }from '../../../pipes/filter.pipe';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit  {

  	@Input() projects: Project[];
  	selectedProjects: Project[];
  	selected_count:number = 0;
  	searchText: string = "";
  	filterActivated: boolean = false;
  	
	@Input() parentForm: FormGroup;
  
  	constructor() {
  	}
  	ngOnInit(): void {
    	this.getSelected();
 	}
  	
  	// Getting Selected Games and Count
  	getSelected(){
  		
    	this.selectedProjects = this.projects.filter(project => {
          return project.selected;
        });
    	/*this.selectedSubProjects = this.subprojects.filter(project => {
          return subproject.selected;
        });*/
    	this.selected_count = this.selectedProjects.length; 
    	
    	this.parentForm.patchValue({
		  projects: this.selectedProjects 
		  
		});
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
