import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, from, interval } from 'rxjs';

import { ProfileService } from '../../services/profile/profile.service';
import { RequestService } from '../../services/request/request.service';
import { Profile } from '../../models/profile.model';
import { Request } from '../../models/request.model';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-create-request-modal',
  templateUrl: './create-request-modal.component.html'
})
export class CreateRequestModalComponent {
  
  	createRequestForm: FormGroup;
  	creationLabel: string;
  	profiles: Profile[] = [];
  	request: Request;
  	@Input() public project: Project ;
  
  	constructor( public profileService: ProfileService, public requestService: RequestService, public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
    	this.createForm();
  	}
  
  	ngOnInit() {
  		this.getProfiles().subscribe(
      		profiles => this.profiles = profiles
    	);
  	}
  	
  	getProfiles() : Observable<Profile[]>{
		this.profileService.getProfiles().subscribe(data => {
			this.profiles = data;
		});
	   	return of(this.profiles);	
	}
  
  	private createForm() {
    	this.createRequestForm = this.formBuilder.group({
      		beginDate: new FormControl(),
      		endDate: new FormControl(),
		    daysPerWeek: new FormControl(),
		    totalDays: new FormControl(),
		    profile: new FormControl()
		});
	}
  
  	private submitForm() {
    	if (this.project != null) {
	    	var request = new Request(this.createRequestForm.value);
	    	var profile = new Profile();
	    	profile.id = this.createRequestForm.controls.profile.value;
	    	console.log("profile.id:" + profile.id);
	    	request.profile = profile;
	    	request.project = this.project;
	    	console.log("Request " + request);
	    	this.requestService.createRequest(request).subscribe(data => {
				this.request = data;
			});
			console.log(this.project);
    	} else {
    		console.log("Error");
    	}
    	this.activeModal.close();
  	}
}