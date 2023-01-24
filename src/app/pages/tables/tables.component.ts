import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ProjectService } from '../../services/project.service';
import { CreateProjectModalComponent } from '../../components/modals/create-project-modal/create-project-modal.component';

import { Project } from '../../models/project.model';


@Component({
  selector: "app-tables",
  templateUrl: "tables.component.html"
})
export class TablesComponent implements OnInit {

  	projects: Project[] = [];
  	
	constructor(private modalService: NgbModal, public projectService: ProjectService, private router:Router, private activatedRoute:ActivatedRoute) { }

  	ngOnInit() {
  		this.getProjects();
  	}
  
  	getProjects() {
	    this.projects = [];
		this.projectService.getProjectsWithNoParent().subscribe(data => {
	    	this.projects = data;
	    });
	}
	
	openFormModal() {
	
	  const modalRef = this.modalService.open(CreateProjectModalComponent);
	  
	  modalRef.result.then((result) => {
	    this.projectService.getProjectsWithNoParent().subscribe(data => {
	    	this.projects = data;
	    });
	  }).catch((error) => {
	    console.log(error);
	  });
	}
}
