import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, from, interval } from 'rxjs';

import { ResourceService } from '../../../services/resource.service';
import { UtilsService } from '../../../services/utils.service';
import { Resource } from '../../../models/resource.model';

@Component({
  selector: 'app-create-resource-modal',
  templateUrl: './create-resource-modal.component.html'
})
export class CreateResourceModalComponent implements OnInit {

  	createResourceForm: FormGroup;
  	roles: any;
  	@Input() public resource: Resource;
  	submitted = false;
  	
  	constructor(public resourceService: ResourceService, 
  		public activeModal: NgbActiveModal, 
  		private formBuilder: FormBuilder,
	  	private utils: UtilsService ) {
    }
  	  
  	ngOnInit(): void {
  		this.roles = this.utils.getProperty('roles', null, null);
    	this.createForm();
  	}
  	
  	createForm() {
    	this.createResourceForm = this.formBuilder.group({
      		username: [this.resource?.username, [Validators.required, Validators.minLength(4)]],
			firstname: [this.resource?.firstname, Validators.required],
			lastname: [this.resource?.lastname, Validators.required],
			quadri: [this.resource?.quadri, [Validators.required, Validators.minLength(4), , Validators.maxLength(4)]],
			role: [this.resource?.role, Validators.required],
			password: [this.resource?.password, [Validators.required, Validators.minLength(6)]],
		});
	}
  
    get f() { return this.createResourceForm.controls; }
    
  	private submitForm() {
        this.submitted = true;
  		if (this.createResourceForm.invalid) {
            return;
        }
        
    	var resource = new Resource(this.createResourceForm.value);
    	this.resourceService.register(resource).subscribe(data => {
			this.activeModal.close(data);
		});
  	}
}