import { Component, Output, EventEmitter, Input, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, from, interval } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Need } from '../../models/need.model';
import { Profile } from '../../models/profile.model';
import { Project } from '../../models/project.model';

import { NeedService } from '../../services/need.service';
import { UtilsService } from '../../services/utils.service';
import { ProfileService } from '../../services/profile.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-create-need-modal',
  templateUrl: './create-need-modal.component.html'
})
export class CreateNeedModalComponent implements OnInit {

  	createNeedForm: FormGroup;
  	
  	projectControl = new FormControl();
  	profileControl = new FormControl();
  	
  	types: any;
  	criticities: any;
  	
  	filteredProjects: Observable<Project[]>;
  	projects: Project[];
  	
  	filteredProfiles: Observable<Profile[]>;
  	profiles: Profile[];
  	
  	constructor(private needService: NeedService, 
	  		private profileService: ProfileService, 
	  		private projectService: ProjectService, 
	  		private utils: UtilsService,
	  		private formBuilder: FormBuilder) {
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
      		//profile: new FormControl(),
      		criticity: new FormControl(),
    		type: new FormControl(),
    		//project: new FormControl(),
    		status: new FormControl(),
    		requestor: new FormControl(),
    		calendarValues: new FormControl()
		});
  	}
  
  	private submitForm() {
  		/*var todoItemToCreate = new Todo(this.createTodoItemForm.value);
  		todoItemToCreate.createdBy = this.authenticationService.currentResourceValue;
  		todoItemToCreate.creationDate = new Date().toDateString();
		console.log(todoItemToCreate);
		this.todoService.createTodo(todoItemToCreate).subscribe(data => {
			this.todoItem = data;
		});
	    this.activeModal.close();*/
  	}

}
