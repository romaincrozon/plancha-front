import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Observable, of, from, interval } from 'rxjs';
import { Location } from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { SubProjectService } from '../../services/subproject.service';

import { Project } from '../../models/project.model';
import { SubProject } from '../../models/sub-project.model';


@Component({
  selector: 'app-subproject',
  templateUrl: './subproject.component.html'
})
export class SubprojectComponent implements OnInit {

	id: string;
	project: Project;
	subproject: SubProject;
  	updateSubProjectForm: FormGroup;
  	
  	constructor(public subprojectService: SubProjectService, private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
  		this.createForm();
  	}

  	ngOnInit() : void{
  		this.getSubProject().subscribe(
      		currentSubProject => this.subproject = currentSubProject
    	);
  	}
  	
  	getSubProject() : Observable<SubProject>{
		this.activatedRoute.paramMap.subscribe(params => {
	      	this.id = params.get('id');
		});	  
		this.subprojectService.getSubProjectById(this.id).subscribe(data => {
			this.subproject = data;
		});
		console.log(this.subproject);
	    return of(this.subproject);	
	}
	
	private createForm() {
	    this.updateSubProjectForm = this.formBuilder.group({
	    	name: new FormControl(),
	      	status: new FormControl()
  	    });
	}
	
	private submitForm() {
		if (this.id != null){
		    var subprojectToUpdate = new SubProject(this.updateSubProjectForm.value);
		    subprojectToUpdate.id = this.id;
		    this.subprojectService.updateSubProject(subprojectToUpdate).subscribe(data => {
				this.subproject = data;
			});
		}else{
			console.log("Error");
		}
	}
}