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
  selector: 'app-project',
  templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {

	id: string;
	project: Project;
  	updateProjectForm: FormGroup;
  	
  	constructor(public projectService: ProjectService, public subProjectService: SubProjectService, private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
  		this.createForm();
  	}

  	ngOnInit() : void{
  		this.getProject().subscribe(
      		currentProject => this.project = currentProject
    	);
  	}
  	
  	getProject() : Observable<Project>{
		this.activatedRoute.paramMap.subscribe(params => {
	      	this.id = params.get('id');
		});	  
		this.projectService.getProjectById(this.id).subscribe(data => {
			this.project = data;
		});
	    return of(this.project);	
	}
	
	private createForm() {
	    this.updateProjectForm = this.formBuilder.group({
	    	name: new FormControl(),
	      	status: new FormControl()
  	    });
	}
	
	private submitForm() {
		if (this.id != null){
		    var projectToUpdate = new Project(this.updateProjectForm.value);
		    projectToUpdate.id = this.id;
		    this.projectService.updateProject(projectToUpdate).subscribe(data => {
				this.project = data;
			});
		}else{
			console.log("Error");
		}
	}
}
