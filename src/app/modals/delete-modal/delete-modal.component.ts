import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html'
})

export class DeleteModalComponent implements OnInit {
 
 	public service: any;
 	public object: any;
 	
  	constructor(public activeModal: NgbActiveModal) {}
  	
  	ngOnInit() {
  	}
  	
  	private validate() {
  		console.log(this.object);
  		if (this.object && this.service){
  			console.log("delete object");
			this.service.delete(this.object); 
	  	}
  		this.activeModal.close();
  	}
}
