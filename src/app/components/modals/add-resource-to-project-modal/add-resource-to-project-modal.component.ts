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

@Component({
  selector: 'app-add-resource-to-project-modal',
  templateUrl: './add-resource-to-project-modal.component.html'
})
export class AddResourceToProjectModalComponent implements OnInit {

  	addResourceToProjectForm: FormGroup;
  	resourcesControl = new FormControl();
  	//filteredResources: Observable<Resource[]>;
  	resources: Resource[];
  	
  	project: Project;

  	constructor(public resourceService: ResourceService, public projectService: ProjectService, public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
    	this.createForm();
  	}
  	
	ngOnInit() {
		this.getAllResources();
	}
  
  
  	private getAllResources(){
  		this.resourceService.getAll().subscribe(data => {
			this.resources = data;
		    /*this.filteredResources = this.resourcesControl.valueChanges.pipe(
		    	startWith(''),
		      	map(value => this.filter(value))
		    );*/
		});
    
  	}
  	
  	private createForm() {
    	this.addResourceToProjectForm = this.formBuilder.group({
      		resource: null,
		});
	}
  
  	private submitForm() {
  		var resource = new Resource();
  		resource.id = this.addResourceToProjectForm.value.resource;
  		
  		if (this.project.resources == null){
  			this.project.resources = [];
  		}
  		this.project.resources.push(resource);
  		this.projectService.addResourceToProject(this.project.id, resource).subscribe(data => {
		    this.activeModal.close(data);
		});
  	}
	
	private filter(value: string): Resource[] {
	    const filterValue = value.toLowerCase();
	   	return this.resources.filter(resource => resource.quadri?.toLowerCase().indexOf(filterValue) === 0);
	}

}
