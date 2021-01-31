import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CreateResourceModalComponent } from '../../modals/create-resource-modal/create-resource-modal.component';
import { ResourceService } from '../../services/resource.service';
import { Resource } from '../../models/resource.model';

@Component({
  selector: 'app-resources-table-full',
  templateUrl: './resources-table-full.component.html'
})
export class ResourcesTableFullComponent implements OnInit {

  	resources: Resource[];
  	
	constructor(private resourceService: ResourceService, private modalService: NgbModal) { }

  	ngOnInit(): void {
  		this.resourceService.getAll().subscribe(data => {
			this.resources = data;
		});
  	}
  	
  	openFormModal() {
		const modalRef = this.modalService.open(CreateResourceModalComponent);
  
		modalRef.result.then((result) => {
		  console.log(result);
		}).catch((error) => {
		  console.log(error);
		});
  	}

}
