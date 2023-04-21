import { Component, Output, EventEmitter, Input, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, from, interval } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ResourceService } from '../../../services/resource.service';
import { ProjectService } from '../../../services/project.service';
import { Resource } from '../../../models/resource.model';
import { Project } from '../../../models/project.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ResourceCalendar } from 'src/app/models/resource-calendar.model';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-resource-to-project-modal',
  templateUrl: './add-resource-to-project-modal.component.html'
})
export class AddResourceToProjectModalComponent implements OnInit {

  	addResourceToProjectForm: FormGroup;

  	filteredResources: Observable<Resource[]>;
  	resources: Resource[];
  	project: Project;

  	constructor(public resourceService: ResourceService, 
			public projectService: ProjectService, 
			public authenticationService: AuthenticationService, 
			public utilsService: UtilsService, 
			public activeModal: NgbActiveModal, 
			private formBuilder: FormBuilder) {
  	}
  	
	ngOnInit() {
		this.createForm();
		this.getAllResources();
	}
  
	private createForm() {
    	this.addResourceToProjectForm = this.formBuilder.group({
      		resourceControl: new FormControl('', Validators.required),
		});
	}
  	private getAllResources(){
		let existingResources = this.project? this.project.resources? this.project.resources.map(resource => resource.id) : [] : [];
		this.resourceService.getAll().subscribe(data => {
			this.resources = data.filter(resource => resource.id != this.authenticationService.currentResourceValue.id && !existingResources.find(existingResourceId => existingResourceId == resource.id));
			this.filteredResources = this.addResourceToProjectForm.controls.resourceControl.valueChanges.pipe(
		    	startWith(''),
		      	map(value => this.utilsService.filterByQuadri(this.resources, value))
		    );
		});
  	}
  
  	private submitForm() {
		let resourceCalendar = new ResourceCalendar();
		resourceCalendar.project = this.project;
		resourceCalendar.resource = this.resources.find(resource => resource.quadri == this.addResourceToProjectForm.controls.resourceControl.value);
		resourceCalendar.calendarItems = [];
		if (!this.project.resourceCalendars)
			this.project.resourceCalendars = [];
		this.project.resourceCalendars.push(resourceCalendar);
		this.activeModal.close(this.project);
  	}
	
	private filter(value: string): Resource[] {
	    const filterValue = value.toLowerCase();
	   	return this.resources.filter(resource => resource.quadri?.toLowerCase().indexOf(filterValue) === 0);
	}
}
