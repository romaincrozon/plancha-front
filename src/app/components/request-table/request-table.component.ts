import { Component, Input, OnInit } from "@angular/core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { RequestService } from '../../services/request.service';
import { CreateRequestModalComponent } from '../../modals/create-request-modal/create-request-modal.component';
import { Request } from '../../models/request.model';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-request-table',
  templateUrl: './request-table.component.html'
})
export class RequestTableComponent implements OnInit {

	@Input() project: Project;
	requests: Request[];
  	
 	constructor(private modalService: NgbModal, private requestService: RequestService) { }

  	ngOnInit(): void {
	  	this.getRequests();
  	}

  	getRequests(){
  		if (this.project != null){  
			console.log("Get requests for project " + this.project.id);
			this.requestService.getRequestsByProject(this.project.id).subscribe(data => {
				this.requests = data;
			});
		} else {
			console.log("Get requests for all project ");
			this.requestService.getRequests().subscribe(data => {
				this.requests = data;
			});
		}
  	}
  	
  	openFormModal() {
		const modalRef = this.modalService.open(CreateRequestModalComponent);
		modalRef.componentInstance.project = this.project;
		
		modalRef.result.then((result) => {
			this.getRequests();
		}).catch((error) => {
		  console.log(error);
		});
  	}
}
