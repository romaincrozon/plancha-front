import { Component, Output, OnInit, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { ProjectService } from '../../../services/project.service';

import { Project } from '../../../models/project.model';
import { appProperties } from '../../../app.messages';

@Component({
  selector: 'app-create-project-modal',
  templateUrl: './create-project-modal.component.html'
})
export class CreateProjectModalComponent implements OnInit {
  
  	createProjectForm: FormGroup;
  	parent: Project;
  	projects: Project[];
  	selectedColor: string;
  	colors: string[];
  
  	constructor( public projectService: ProjectService, 
  			public activeModal: NgbActiveModal, 
  			private formBuilder: FormBuilder,  ) {
    }
  	
  	ngOnInit() {
  		this.colors = appProperties.colors;
		  this.projectService.getAllProjects().subscribe(data => {
			this.projects = data;
		});
		this.createForm();
  	}
    
  	private selectColor(color: string){
  		this.selectedColor = color;
  	}
  	
  	private createForm() {
    	this.createProjectForm = this.formBuilder.group({
      		name: new FormControl('', Validators.required),
      		status: new FormControl('', Validators.required),
			parent: new FormControl(this.parent ? this.parent.id : ''),
	      	confidencePercentage: new FormControl(),
			soldWorkload: new FormControl(),
			challengedWorkload: new FormControl(),
			consumedWorkload: new FormControl(),
			projectMargin: new FormControl(),
			color: new FormControl(),
    	});
  	}
  
  	private createProject() {
  		var projectToCreate = new Project(this.createProjectForm.value);
		if (projectToCreate.parent){
			let parentProject = new Project();
			parentProject.id = projectToCreate.parent + "";
			projectToCreate.parent = parentProject; 
		} else {
			projectToCreate.parent = null;
		}
		this.projectService.createProject(projectToCreate).subscribe(data => {
		    this.activeModal.close(data);
		});
  	}
}