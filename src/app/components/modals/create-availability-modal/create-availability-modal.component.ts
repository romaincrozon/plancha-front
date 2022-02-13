import { Component, Output, EventEmitter, Input, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, from, interval } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Availability } from '../../../models/availability.model';
import { Profile } from '../../../models/profile.model';
import { Resource } from '../../../models/resource.model';
import { CalendarValue } from '../../../models/calendar-value.model';

import { AvailabilityService } from '../../../services/availability.service';
import { UtilsService } from '../../../services/utils.service';
import { ResourceService } from '../../../services/resource.service';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-create-availability-modal',
  templateUrl: './create-availability-modal.component.html'
})
export class CreateAvailabilityModalComponent implements OnInit {

  	createAvailabilityForm: FormGroup;
  	
  	resourceControl = new FormControl();
  	resource: Resource;
  	implications: any;
  	
  	filteredResources: Observable<Resource[]>;
  	resources: Resource[];
  	
  	calendarValues: CalendarValue[];
  	
  	constructor(private availabilityService: AvailabilityService, 
	  		private resourceService: ResourceService, 
	  		private utils: UtilsService, 
  			private activeModal: NgbActiveModal, 
	  		private formBuilder: FormBuilder,  		
        	private authenticationService: AuthenticationService) {
  		this.createForm(); 
  	}

  	ngOnInit(): void {
  		this.getAllResources();
  		this.implications = this.utils.getProperty('implication', null, null);
  	}
  	
  	private getAllResources(){
  		this.resourceService.getAll().subscribe(data => {
			this.resources = data.filter(resource => resource.id != this.authenticationService.currentResourceValue.id);
		    this.filteredResources = this.resourceControl.valueChanges.pipe(
		    	startWith(''),
		      	map(value => this.utils.filterByQuadri(this.resources, value))
		    );
		});
  	}
  	
  	private createForm() {
    	this.createAvailabilityForm = this.formBuilder.group({
    		implication: new FormControl(),
    		calendarValues: new FormControl()
		});
  	}
  
  	private setCalendarValues(event){
  		this.calendarValues = event;
  	}
  	
  	private updateResource(object){
  		this.resource = object;
  	}
  	
  	private submitForm() {
  		var availabilityToCreate = new Availability(this.createAvailabilityForm.value);
    	
  		var resourceTmp = new Resource();
    	resourceTmp.id = this.resource.id;
    	
  		availabilityToCreate.resource = resourceTmp;
  		availabilityToCreate.calendarValues = this.calendarValues;
  		availabilityToCreate.requestor = this.authenticationService.currentResourceValue;
		
		console.log(availabilityToCreate);
		this.availabilityService.createAvailability(availabilityToCreate).subscribe(data => {
	    	this.activeModal.close(data);
		});
  	}

}
