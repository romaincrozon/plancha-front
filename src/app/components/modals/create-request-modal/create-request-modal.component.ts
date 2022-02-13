import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, from, interval } from 'rxjs';

import { ProfileService } from '../../../services/profile.service';
import { RequestService } from '../../../services/request.service';
import { ProjectService } from '../../../services/project.service';
import { Profile } from '../../../models/profile.model';
import { Request } from '../../../models/request.model';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-create-request-modal',
  templateUrl: './create-request-modal.component.html'
})
export class CreateRequestModalComponent {
  
  	createRequestForm: FormGroup;
  	creationLabel: string;
  	profiles: Profile[] = [];
  	projects: Project[] = [];
  	request: Request;
  	@Input() public project: Project ;
  
  	constructor( public profileService: ProfileService, public projectService: ProjectService, public requestService: RequestService, public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
    	this.createForm();
  	}
  
  	ngOnInit() {
  		this.getProfiles().subscribe(
      		profiles => this.profiles = profiles
    	);
  		this.getProjects().subscribe(
      		projects => this.projects = projects
    	);
  	}
  	
  	getProfiles() : Observable<Profile[]>{
		this.profileService.getProfiles().subscribe(data => {
			this.profiles = data;
		});
	   	return of(this.profiles);	
	}
	
  	getProjects() : Observable<Project[]>{
		this.projectService.getProjects().subscribe(data => {
			this.projects = data;
		});
	   	return of(this.projects);	
	}
  
  	private createForm() {
    	this.createRequestForm = this.formBuilder.group({
      		beginDate: new FormControl(),
      		endDate: new FormControl(),
		    daysPerWeek: new FormControl(),
		    totalDays: new FormControl(),
		    profile: new FormControl(),
		    project: new FormControl()
		});
	}
  
  	private submitForm() {
  		console.log(this.createRequestForm.value);
    	var request = new Request(this.createRequestForm.value);
    	this.requestService.createRequest(request).subscribe(data => {
			this.request = data;
		});
    	this.activeModal.close();
  	}
}