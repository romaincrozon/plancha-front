import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { SubProjectService } from '../../services/subproject.service';
import { ProjectService } from '../../services/project.service';
import { TaskService } from '../../services/task.service';

import { Project } from '../../models/project.model';
import { SubProject } from '../../models/sub-project.model';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-create-project-modal',
  templateUrl: './create-project-modal.component.html'
})
export class CreateProjectModalComponent {
  
  createProjectForm: FormGroup;
  project: Project;
  subproject: SubProject;
  task: Task;
  
  constructor( public projectService: ProjectService, public subprojectService: SubProjectService, public taskService: TaskService, public activeModal: NgbActiveModal, private formBuilder: FormBuilder,  ) {
    this.createForm();
  }
  
  private createForm() {
    this.createProjectForm = this.formBuilder.group({
      name: new FormControl(),
      status: new FormControl()
    });
  }
  
  private submitForm() {
  	if (this.project != null){
	    var subProjectToCreate = new SubProject(this.createProjectForm.value);
	    subProjectToCreate.project = this.project;
	    this.subprojectService.createSubProject(subProjectToCreate).subscribe(data => {
			this.subproject = data;
		});
	}else if (this.subproject != null){
	    var taskToCreate = new Task(this.createProjectForm.value);
	    //taskToCreate.subproject = this.subproject;
	    //this.taskService.createTask(taskToCreate).subscribe(data => {
		//	this.task = data;
		//});
	} else {
  		var projectToCreate = new Project(this.createProjectForm.value);
		this.projectService.createProject(projectToCreate).subscribe(data => {
			this.project = data;
		});
	}
    this.activeModal.close();
  }
}