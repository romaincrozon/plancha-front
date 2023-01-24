import { OnInit, Input, EventEmitter, Output } from '@angular/core';
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
	@Input() parentForm: FormGroup;
	@Output() filterEvent = new EventEmitter<Project[]>(); 
  	
  	searchText: string = "";
  	filterActivated: boolean = false;
	isCollapsedMap = new Map<string, boolean>(); 
  
  	constructor() {}

  	ngOnInit(): void { 
		this.initSelection();
		this.setCollapsedMap(this.projects); 
	}

	initSelection(){ this.projects.forEach(project => project.selected = true); }
  	changeSelection(){ this.filterEvent.emit(this.projects); }
  	clearFilter(){ this.searchText = ""; }
  	focusIn(){ this.filterActivated = true;console.log("focusin") }
  	focusOut(){ this.filterActivated = false; console.log("focusout")}

	setCollapsedMap(projects: Project[]){
		for (var item of projects){
			this.isCollapsedMap.set(item.id, true);
			this.setCollapsedMap(item.projects);
		}
	}

	toggle(id: string){ this.isCollapsedMap.set(id, !this.isCollapsedMap.get(id));}
	isCollapsed(id: string): boolean{ return this.isCollapsedMap.get(id); }
  	
}
