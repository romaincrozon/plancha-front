import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import { Resource } from '../../../models/resource.model';
import { Project } from '../../../models/project.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddResourceToProjectModalComponent } from '../../modals/add-resource-to-project-modal/add-resource-to-project-modal.component';

@Component({
  selector: "app-resources-table",
  templateUrl: "resources-table.component.html"
})
export class ResourcesTableComponent implements OnInit {

  	@Input() project: Project;
	
  	mapResources = new Map<string, Resource>(); 
  	
	constructor(private modalService: NgbModal, 
		public projectService: ProjectService, 
		private router:Router, 
		private activatedRoute:ActivatedRoute) { }

  	ngOnInit(): void {
		this.createMapResources(this.mapResources, this.project);
  	}

	createMapResources(mapResources: Map<string, Resource>, project: Project){
		for (let resource of project.resources){
			mapResources.set(resource.id, resource);
		}
		for (let p of project.projects){
			this.createMapResources(mapResources, p);
		}
	}

  	openFormModal() {
		const modalRef = this.modalService.open(AddResourceToProjectModalComponent);
	  	modalRef.componentInstance.project = this.project;
		
	  	modalRef.result.then((result) => {
		   this.project = result;
	  	}).catch((error) => {	    	
	  		console.log(error);
	  	});
	}
}
