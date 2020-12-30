import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Observable, of, from, interval } from 'rxjs';
import { Location } from '@angular/common';
import { ProjectService } from '../../services/project/project.service';
import { SubProjectService } from '../../services/subproject/subproject.service';

import { Project } from '../../models/project.model';
import { SubProject } from '../../models/sub-project.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {

	id: string;
	object: any;
	typeObject: string;
  	updateProjectForm: FormGroup;
  	
  	constructor(public projectService: ProjectService, public subProjectService: SubProjectService, private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
  		this.createForm();
  	}

  	ngOnInit() : void{
  		this.getObject().subscribe(
      		currentObject => this.object = currentObject
    	);
  	}
  	
  	getObject() : Observable<any[]>{
		this.activatedRoute.paramMap.subscribe(params => {
	      	this.id = params.get('id');
		});	  
		  	
		if (this.router.url.includes("subproject")){
			this.typeObject = "subproject";
			this.subProjectService.getSubProjectById(this.id).subscribe((data: {}) => {
				this.object = data;
			});
		}else{
			this.typeObject = "project";
			this.projectService.getProjectById(this.id).subscribe((data: {}) => {
				this.object = data;
			});
		}
	    return of(this.object);	
	}
	
	private createForm() {
	    this.updateProjectForm = this.formBuilder.group({
	    	name: new FormControl(),
	      	status: new FormControl()
  	    });
	}
	
	private submitForm() {
		if (this.id != null){
			if (this.typeObject == 'project'){
			    var projectToUpdate = new Project(this.updateProjectForm.value);
			    projectToUpdate.id = this.id;
			    this.projectService.updateProject(projectToUpdate).subscribe(data => {
					this.object = data;
				});
			}else if (this.typeObject == 'subproject') {
			    var subProjectToUpdate = new SubProject(this.updateProjectForm.value);
			    subProjectToUpdate.id = this.id;
			    this.subProjectService.updateSubProject(subProjectToUpdate).subscribe(data => {
					this.object = data;
				});
			}
		}else{
			console.log("Error");
		}
	}
}
