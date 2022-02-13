import { Component, Output, EventEmitter, Input, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, from, interval } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Need } from '../../../models/need.model';
import { Profile } from '../../../models/profile.model';
import { Project } from '../../../models/project.model';
import { CalendarValue } from '../../../models/calendar-value.model';

import { NeedService } from '../../../services/need.service';
import { UtilsService } from '../../../services/utils.service';
import { ProfileService } from '../../../services/profile.service';
import { ProjectService } from '../../../services/project.service';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-create-need-modal',
  templateUrl: './create-need-modal.component.html'
})
export class CreateNeedModalComponent implements OnInit {

  	createNeedForm: FormGroup;
  	
  	projectControl = new FormControl();
  	profileControl = new FormControl();
  	project: Project;
  	profile: Profile;
  	
  	types: any;
  	criticities: any;
  	
  	filteredProjects: Observable<Project[]>;
  	projects: Project[];
  	
  	filteredProfiles: Observable<Profile[]>;
  	profiles: Profile[];
  	
  	calendarValues: CalendarValue[];
  	isProjectNeed: boolean; 
  	
  	constructor(private needService: NeedService, 
	  		private profileService: ProfileService, 
	  		private projectService: ProjectService, 
	  		private utils: UtilsService, 
  			private activeModal: NgbActiveModal, 
	  		private formBuilder: FormBuilder,  		
        	private authenticationService: AuthenticationService) {
  		this.createForm(); 
  	}

  	ngOnInit(): void {
  		this.getAllProjects();
  		this.getAllProfiles();
  		this.types = this.utils.getProperty('type', null, null);
  		this.criticities = this.utils.getProperty('criticity', null, null);
  	}
  	
  	private getAllProjects(){
  		this.projectService.getProjects().subscribe(data => {
			this.projects = data;
		    this.filteredProjects = this.projectControl.valueChanges.pipe(
		    	startWith(''),
		      	map(value => this.utils.filterByName(this.projects, value))
		    );
		});
  	}
  	
  	private getAllProfiles(){
  		this.profileService.getProfiles().subscribe(data => {
			this.profiles = data;
		    this.filteredProfiles = this.profileControl.valueChanges.pipe(
		    	startWith(''),
		      	map(value => this.utils.filterByName(this.profiles, value))
		    );
		});
  	}
	
  	private createForm() {
    	this.createNeedForm = this.formBuilder.group({
      		criticity: new FormControl(),
    		status: new FormControl(),
    		comment: new FormControl(),
    		calendarValues: new FormControl()
		});
  	}
  
  	private setCalendarValues(event){
  		this.calendarValues = event;
  	}
  	
  	private updateProject(object){
  		this.project = object;
  	}
  	private updateProfile(object){
  		this.profile = object;
  	}
  	
  	private submitForm() {
  		var needToCreate = new Need(this.createNeedForm.value);
    	
    	var profileTmp = new Profile();
    	profileTmp.id = this.profile.id;
  		var projectTmp = new Project();
    	projectTmp.id = this.project.id;
    	
  		needToCreate.profile = profileTmp;
  		needToCreate.project = projectTmp;
  		needToCreate.status = 0; //default value "A traiter"
  		needToCreate.projectNeed = true;
  		needToCreate.calendarValues = this.calendarValues;
  		needToCreate.requestor = this.authenticationService.currentResourceValue;
		
		console.log(needToCreate);
		this.needService.createNeed(needToCreate).subscribe(data => {
	    	this.activeModal.close(data);
		});
  	}

}
