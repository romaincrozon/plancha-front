import { Component, Output, EventEmitter, Input, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, from, interval } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ResourceService } from '../../services/resource.service';
import { Resource } from '../../models/resource.model';

@Component({
  selector: 'app-add-resource-to-task-modal',
  templateUrl: './add-resource-to-task-modal.component.html'
})
export class AddResourceToTaskModalComponent implements OnInit {
  	
  	addResourceToTaskForm: FormGroup;
  	myControl = new FormControl();
  	filteredResources: Observable<Resource[]>;
  	@Input() resources: Resource[];
  
  	constructor( public resourceService: ResourceService, public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
    	this.createForm();
  	}
  
  	private createForm() {
    	this.addResourceToTaskForm = this.formBuilder.group({
      		resource: null,
			startDate: '',
			endDate: '',
			numberOfDaysPerWeek: 0,
		});
	}
  
  	private submitForm() {
    	//var resource = new Resource(this.addResourceToTaskForm.value);
		//console.log("Resource:" + resource);
    	this.activeModal.close();
  	}
  	
	ngOnInit() {
	    this.filteredResources = this.myControl.valueChanges.pipe(
	    	startWith(''),
	      	map(value => this.filter(value))
	    );
	}
	
	private filter(value: string): Resource[] {
	    const filterValue = value.toLowerCase();
	   	return this.resources.filter(resource => resource.quadri.toLowerCase().indexOf(filterValue) === 0);
	}
}
