import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Observable, of, from, interval } from 'rxjs';
import { Location } from '@angular/common';
import { ProjectService } from '../../services/project.service';

import { Project } from '../../models/project.model';
import { SubProject } from '../../models/sub-project.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {

	id: string;
	project: Project;
	projects: Project[];
  	updateProjectForm: FormGroup;
  	
  	constructor(public projectService: ProjectService, private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {}

  	ngOnInit() : void{
  		this.projectService.getProjects().subscribe(data => {
			this.projects = data;
			this.getProject();
		});
	}
  	
  	getProject() {
		this.activatedRoute.paramMap.subscribe(params => { this.id = params.get('id') });	  
		this.project = this.projects.find(p => p.id == this.id);
		if (this.project)
			this.createForm();
		this.projects.filter(p => p.id != this.id);
	}
	
	private createForm() {
	    this.updateProjectForm = this.formBuilder.group({
	    	name: new FormControl(this.project.name, Validators.required),
			status: new FormControl(this.project.status ? this.project.status : 'active', Validators.required),
			parent: new FormControl(this.project.parent? this.project.parent.id : '', Validators.required)
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
