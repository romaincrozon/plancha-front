import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CreateProjectModalComponent } from '../../modals/create-project-modal/create-project-modal.component';
import { TaskService } from '../../services/task.service';
import { SubProjectService } from '../../services/subproject.service';
import { ProjectService } from '../../services/project.service';

import { Task } from '../../models/task.model';
import { SubProject } from '../../models/sub-project.model';
import { Project } from '../../models/project.model';

@Component({
  selector: "app-projects-table",
  templateUrl: "projects-table.component.html"
})
export class ProjectsTableComponent implements OnInit {

  	@Input() project: Project;
  	@Input() subproject: SubProject;
  	@Input() object: any;
  	@Input() typeObject: string;
  	@Input() id: number;
  	
  	list: any[];
  	
	constructor(private subprojectService: SubProjectService, private projectService: ProjectService, private taskService: TaskService, private modalService: NgbModal) { }

  	ngOnInit() {
  		console.log("Project Id: " + this.id);
  		
  		if (this.typeObject == "project") {
  			console.log("Get subprojects");
	  		this.subprojectService.getSubProjectsByProjectId(this.id).subscribe(data => {
				this.list = data;
			});
  		}else if (this.typeObject == "subproject"){
  			console.log("Get tasks");
  			this.taskService.getTasks().subscribe(data => {
				this.list = data;
			});
  		}else{
  			console.log("Get projects");
  			this.projectService.getProjects().subscribe(data => {
				this.list = data;
			});
  		}
  	}
  	
  	openFormModal() {
		const modalRef = this.modalService.open(CreateProjectModalComponent);
		modalRef.componentInstance.project = this.project;
		modalRef.componentInstance.subproject = this.subproject;
  
		modalRef.result.then((result) => {
		  console.log(result);
		}).catch((error) => {
		  console.log(error);
		});
  	}
}
