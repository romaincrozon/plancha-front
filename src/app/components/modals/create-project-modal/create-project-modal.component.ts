import { Component, Output, OnInit, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { SubProjectService } from '../../../services/subproject.service';
import { ProjectService } from '../../../services/project.service';
import { TaskService } from '../../../services/task.service';

import { Project } from '../../../models/project.model';
import { SubProject } from '../../../models/sub-project.model';
import { Task } from '../../../models/task.model';
import { appProperties } from '../../../app.messages';

@Component({
  selector: 'app-create-project-modal',
  templateUrl: './create-project-modal.component.html'
})
export class CreateProjectModalComponent implements OnInit {
  
  	createProjectForm: FormGroup;
  	project: Project;
  	selectedColor: string;
  	colors: string[];
  
  	constructor( public projectService: ProjectService, 
  			public activeModal: NgbActiveModal, 
  			private formBuilder: FormBuilder,  ) {
    }
  	
  	ngOnInit() {
  		this.createForm();
  		this.colors = appProperties.colors;
  	}
    
  	private selectColor(event: any, color: string){
  		this.selectedColor = color;
  		//this.renderer.addClass(event.target, 'selected');
  		console.log(this.selectedColor);
  	}
  	
  	private createForm() {
    	this.createProjectForm = this.formBuilder.group({
      		name: new FormControl(),
      		status: new FormControl(),
	      	confidencePercentage: new FormControl(),
			soldWorkload: new FormControl(),
			challengedWorkload: new FormControl(),
			consumedWorkload: new FormControl(),
			projectMargin: new FormControl(),
			color: new FormControl(),
    	});
  	}
  
  	private submitForm() {
  		var projectToCreate = new Project(this.createProjectForm.value);
  		projectToCreate.color = this.selectedColor;
		this.projectService.createProject(projectToCreate).subscribe(data => {
			this.project = data;
		    this.activeModal.close(this.project);
		});
  	}
}