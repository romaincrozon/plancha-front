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
		
  	}

  	ngOnInit() : void{
		this.getProject();
  		
	}
  	
  	getProject() {
		this.activatedRoute.paramMap.subscribe(params => {
	      	this.id = params.get('id');
		});	  
		this.projectService.getProjectById(this.id).subscribe(data => {
			this.project = data;
			console.log()
			this.createForm();
		});
	}
	
	private createForm() {
		console.log(this.project);
	    this.updateProjectForm = this.formBuilder.group({
	    	name: new FormControl(this.project.name, Validators.required),
	      	status: new FormControl(this.project.status, Validators.required)
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
	
	private close(){
		this.project.status = "closed";
		this.projectService.updateProject(this.project).subscribe(data => {
			this.project = data;
		});
	}
}
