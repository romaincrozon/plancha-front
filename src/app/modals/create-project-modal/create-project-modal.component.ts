import { Component, Output, OnInit, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { SubProjectService } from '../../services/subproject.service';
import { ProjectService } from '../../services/project.service';
import { TaskService } from '../../services/task.service';
import { ColorService } from '../../services/color.service';

import { Project } from '../../models/project.model';
import { SubProject } from '../../models/sub-project.model';
import { Task } from '../../models/task.model';
import { Color } from '../../models/color.model';

@Component({
  selector: 'app-create-project-modal',
  templateUrl: './create-project-modal.component.html'
})
export class CreateProjectModalComponent implements OnInit {
  
  	createProjectForm: FormGroup;
  	project: Project;
  	colors: Color[];
  	selectedColor: Color;
  
  	constructor( public projectService: ProjectService, 
  			public colorService: ColorService, 
  			public activeModal: NgbActiveModal, 
  			private formBuilder: FormBuilder,  ) {
    }
  	
  	ngOnInit() {
  		this.createForm();
    	this.getColors();
  	}
  
  	private getColors(){
		this.colorService.getColors().subscribe(data => {
			this.colors = data;
		});
  	}
  
  	private selectColor(color: Color){
  		this.selectedColor = color;
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
		console.log(projectToCreate);
		this.projectService.createProject(projectToCreate).subscribe(data => {
			this.project = data;
		});
	    this.activeModal.close();
  	}
}