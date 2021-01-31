import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, from, interval } from 'rxjs';

import { ResourceService } from '../../services/resource.service';
import { Resource } from '../../models/resource.model';

@Component({
  selector: 'app-create-resource-modal',
  templateUrl: './create-resource-modal.component.html'
})
export class CreateResourceModalComponent {

  	createResourceForm: FormGroup;
  	resource: Resource;
  
  	constructor( public resourceService: ResourceService, public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
    	this.createForm();
  	}
  
  	ngOnInit() {
  	}
  	  
  	private createForm() {
    	this.createResourceForm = this.formBuilder.group({
      		username: '',
			firstname: '',
			lastname: '',
			quadri: '',
			password: '',
		});
	}
  
  	private submitForm() {
    	var resource = new Resource(this.createResourceForm.value);
		console.log("Resource:" + resource);
    	this.resourceService.register(resource).subscribe(data => {
			this.resource = data;
		});
    	this.activeModal.close();
  	}
}