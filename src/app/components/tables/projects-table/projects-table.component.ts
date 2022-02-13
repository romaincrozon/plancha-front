import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
 
import { CreateProjectModalComponent } from '../../modals/create-project-modal/create-project-modal.component';
import { DeleteModalComponent } from '../../modals/delete-modal/delete-modal.component';
import { TaskService } from '../../../services/task.service';
import { SubProjectService } from '../../../services/subproject.service';
import { ProjectService } from '../../../services/project.service';

import { Task } from '../../../models/task.model';
import { SubProject } from '../../../models/sub-project.model';
import { Project } from '../../../models/project.model';

@Component({
  selector: "app-projects-table",
  templateUrl: "projects-table.component.html"
})
export class ProjectsTableComponent implements OnInit {
  	
  	list: Project[];
  	
	constructor(private projectService: ProjectService, private modalService: NgbModal) { }

  	ngOnInit() {
		this.projectService.getProjects().subscribe(data => {
			this.list = data;
		});
  	}
  	
  	openFormModal() {
		const modalRef = this.modalService.open(CreateProjectModalComponent);
		//modalRef.componentInstance.project = this.project;
		//modalRef.componentInstance.subproject = this.subproject;
  
		modalRef.result.then((result) => {
			this.list.push(result);
		}).catch((error) => {
		  console.log(error);
		});
  	}
  	
  	openDeleteModal(project: Project) {
		const modalRef = this.modalService.open(DeleteModalComponent);
	    modalRef.componentInstance.service = this.projectService;
		modalRef.componentInstance.object = project;

		modalRef.result.then((result) => {
			this.list.splice(this.list.indexOf(project), 1);
		}).catch((error) => {
		  	console.log(error);
		});
  	}
}
