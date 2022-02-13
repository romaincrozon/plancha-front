import { Component, Output, OnInit, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { SubProjectService } from '../../../services/subproject.service';
import { ProjectService } from '../../../services/project.service';
import { TaskService } from '../../../services/task.service';
import { TaskTypeService } from '../../../services/task-type.service';

import { Project } from '../../../models/project.model';
import { SubProject } from '../../../models/sub-project.model';
import { Task } from '../../../models/task.model';
import { TaskType } from '../../../models/task-type.model';

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html'
})
export class CreateTaskModalComponent implements OnInit {

  	createTaskForm: FormGroup;
  	task: Task;
  	taskTypes: TaskType[];
  	selectedTaskType: TaskType;
  	subProject: SubProject;
  
  	constructor( public taskService: TaskService, 
  			public taskTypeService: TaskTypeService, 
  			public activeModal: NgbActiveModal, 
  			private formBuilder: FormBuilder,  ) {
    }
  	
  	ngOnInit() {
  		this.createForm();
  		this.getTaskTypes();
  	}
  	
  	private getTaskTypes(){
		this.taskTypeService.getTaskTypes().subscribe(data => {
			this.taskTypes = data;
		});
  	}
  	  	
  	private createForm() {
    	this.createTaskForm = this.formBuilder.group({
      		name: new FormControl(),
      		status: new FormControl(),
			taskType: new FormControl(),
    		soldWorkload: new FormControl(),
			challengedWorkload: new FormControl(),
			consumedWorkload: new FormControl(),
		});
  	}
  
  	private submitForm() {
  		var taskToCreate = new Task(this.createTaskForm.value);
  		
  		taskToCreate.subProject = this.subProject;
		console.log(taskToCreate);
		this.taskService.createTask(taskToCreate).subscribe(data => {
			this.task = data;
		    this.activeModal.close(this.task);
		});
  	}
}