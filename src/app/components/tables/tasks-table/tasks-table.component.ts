import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CreateTaskModalComponent } from '../../../modals/create-task-modal/create-task-modal.component';
import { DeleteModalComponent } from '../../../modals/delete-modal/delete-modal.component';
import { TaskService } from '../../../services/task.service';

import { Task } from '../../../models/task.model';
import { SubProject } from '../../../models/sub-project.model';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html'
})
export class TasksTableComponent implements OnInit {

	@Input() subProject: SubProject;
  	list: Task[];
  	
	constructor(private taskService: TaskService, private modalService: NgbModal) { }

  	ngOnInit() {
  		console.log(this.subProject);
		this.taskService.getTasksBySubProjectId(this.subProject.id).subscribe(data => {
			this.list = data;
		});
  	}
  	
  	openFormModal() {
		const modalRef = this.modalService.open(CreateTaskModalComponent);
		modalRef.componentInstance.subProject = this.subProject;
  
		modalRef.result.then((result) => {
			this.list.push(result);
		}).catch((error) => {
		  console.log(error);
		});
  	}
  	
  	openDeleteModal(task: Task) {
		const modalRef = this.modalService.open(DeleteModalComponent);
	    modalRef.componentInstance.service = this.taskService;
		modalRef.componentInstance.object = task;

		modalRef.result.then((result) => {
			this.list.splice(this.list.indexOf(task), 1);
		}).catch((error) => {
		  	console.log(error);
		});
  	}
}