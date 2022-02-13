import { Component, Output, OnInit, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { SubProjectService } from '../../../services/subproject.service';
import { ProjectService } from '../../../services/project.service';
import { TaskService } from '../../../services/task.service';

import { Project } from '../../../models/project.model';
import { SubProject } from '../../../models/sub-project.model';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-create-subproject-modal',
  templateUrl: './create-subproject-modal.component.html'
})
export class CreateSubprojectModalComponent implements OnInit {

  	createSubprojectForm: FormGroup;
  	subproject: SubProject;
  	project: Project;
  	selectedColor: string; 
  
  	constructor( public subprojectService: SubProjectService, 
  			public activeModal: NgbActiveModal, 
  			private formBuilder: FormBuilder,  ) {
    }
  	
  	ngOnInit() {
  		this.createForm();
  	}
  
  	private selectColor(color: string){
  		this.selectedColor = color;
  		console.log(this.selectedColor);
  	}
  	
  	private createForm() {
    	this.createSubprojectForm = this.formBuilder.group({
      		name: new FormControl(),
      		status: new FormControl(),
			soldWorkload: new FormControl(),
			challengedWorkload: new FormControl(),
			consumedWorkload: new FormControl(),
			color: new FormControl(),
    	});
  	}
  
  	private submitForm() {
  		var subprojectToCreate = new SubProject(this.createSubprojectForm.value);
  		subprojectToCreate.color = this.selectedColor;
  		subprojectToCreate.project = this.project;
		console.log(subprojectToCreate);
		this.subprojectService.createSubProject(subprojectToCreate).subscribe(data => {
			this.subproject = data;
	   	 	this.activeModal.close(this.subproject);
		});
  	}
}