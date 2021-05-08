import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CreateSubprojectModalComponent } from '../../../modals/create-subproject-modal/create-subproject-modal.component';
import { DeleteModalComponent } from '../../../modals/delete-modal/delete-modal.component';
import { TaskService } from '../../../services/task.service';
import { SubProjectService } from '../../../services/subproject.service';
import { ProjectService } from '../../../services/project.service';

import { Task } from '../../../models/task.model';
import { SubProject } from '../../../models/sub-project.model';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-subprojects-table',
  templateUrl: './subprojects-table.component.html'
})
export class SubprojectsTableComponent implements OnInit {

	@Input() project: Project;
  	list: SubProject[];
  	
	constructor(private subprojectService: SubProjectService, private modalService: NgbModal) { }

  	ngOnInit() {
		this.subprojectService.getSubProjectsByProjectId(this.project.id).subscribe(data => {
			this.list = data;
		});
  	}
  	
  	openFormModal() {
		const modalRef = this.modalService.open(CreateSubprojectModalComponent);
		modalRef.componentInstance.project = this.project;
		//modalRef.componentInstance.subproject = this.subproject;
  
		modalRef.result.then((result) => {
		  console.log(result);
		}).catch((error) => {
		  console.log(error);
		});
  	}
  	
  	openDeleteModal(subproject: SubProject) {
		const modalRef = this.modalService.open(DeleteModalComponent);
	    modalRef.componentInstance.service = this.subprojectService;
		modalRef.componentInstance.object = subproject;

		modalRef.result.then((result) => {
			this.list.splice(this.list.indexOf(subproject), 1);
		}).catch((error) => {
		  	console.log(error);
		});
  	}
}
