import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { RequestService } from '../../services/request/request.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html'
})

export class ConfirmModalComponent implements OnInit {
 
  	constructor( public requestService: RequestService, public activeModal: NgbActiveModal) {}
  	
  	ngOnInit() {
  	}
  	
  	private validate() {
  		/*if (this.id != null){
  			switch(this.typeObject) { 
				case "request": { 
				    this.requestService.updateRequest(this.id).subscribe(data => {
						this.request = data;
					});
			    	break; 
			   	} 
			   	default: { 
			      	//statements; 
			      	break; 
			   	} 
			} 
	  	}*/
  		this.activeModal.close();
  	}
}
