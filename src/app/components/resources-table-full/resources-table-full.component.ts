import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CreateResourceModalComponent } from '../modals/create-resource-modal/create-resource-modal.component';
import { DeleteModalComponent } from '../modals/delete-modal/delete-modal.component';
import { ResourceService } from '../../services/resource.service';
import { UtilsService } from '../../services/utils.service';
import { Resource } from '../../models/resource.model';

@Component({
  selector: 'app-resources-table-full',
  templateUrl: './resources-table-full.component.html'
})
export class ResourcesTableFullComponent implements OnInit {

  	resources: Resource[];
  	
	constructor(private resourceService: ResourceService, 
		private modalService: NgbModal,
	  	private utils: UtilsService) { }

  	ngOnInit(): void {
  		this.getAllResources();
  	}
  	
  	getAllResources(){
  		this.resourceService.getAll().subscribe(data => {
			this.resources = data;
		});
  	}
  	
  	openFormModal(resource: Resource) {
		const modalRef = this.modalService.open(CreateResourceModalComponent);
		modalRef.componentInstance.resource = resource;
		
		modalRef.result.then((result) => {
			this.getAllResources();
		}).catch((error) => {
		  	console.log(error);
		});
  	}
  	
  	openDeleteModal(resource: Resource) {
		const modalRef = this.modalService.open(DeleteModalComponent);
	    modalRef.componentInstance.service = this.resourceService;
		modalRef.componentInstance.object = resource;
		modalRef.componentInstance.name = resource.firstname + " " + resource.lastname;

		modalRef.result.then((result) => {
			this.resources.splice(this.resources.indexOf(resource), 1);
		}).catch((error) => {
		  	console.log(error);
		});
  	}
  	

}
