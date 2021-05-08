import { Component} from '@angular/core';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html'
})

export class DeleteModalComponent {
 
 	public service: any;
 	public object: any;
 	
  	constructor(public activeModal: NgbActiveModal) {}
  	
  	private validate() {
  		if (this.object && this.service){
			this.service.delete(this.object); 
	  	}
  		this.activeModal.close();
  	}
}
