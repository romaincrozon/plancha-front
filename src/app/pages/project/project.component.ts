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
	isForecast = false;
	allProjects: Map<string, string>;
  	
  	constructor(public projectService: ProjectService, private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {}

  	ngOnInit() : void{
		this.getProject();
	}
  	
  	getProject() {
		this.activatedRoute.paramMap.subscribe(params => { this.id = params.get('id') 
			this.projectService.getProjectById(this.id).subscribe(data => {
				this.project = data;
				this.isForecast = this.project.status == 'forecast';
				this.projectService.getAllProjects().subscribe(data => {
					this.allProjects = data.filter(p => p.id != this.id);
				});
				this.createForm();
			});
		});	  
	}
	
	private createForm() {
	    this.updateProjectForm = this.formBuilder.group({
	    	name: new FormControl(this.project.name, Validators.required),
			status: new FormControl(this.project.status ? this.project.status : 'active', Validators.required),
			parent: new FormControl(this.project.parent? this.project.parent.id : '0', Validators.required),
			confidencePercentage: new FormControl(this.project.confidencePercentage? this.project.confidencePercentage : ''),
			soldWorkload: new FormControl(this.project.soldWorkload? this.project.soldWorkload : ''),
			challengedWorkload: new FormControl(this.project.challengedWorkload? this.project.challengedWorkload : ''),
			consumedWorkload: new FormControl(this.project.consumedWorkload? this.project.consumedWorkload : ''),
			projectMargin: new FormControl(this.project.projectMargin? this.project.projectMargin : ''),
			color: new FormControl(this.project.color? this.project.color : ''),
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

	changeForecast(e){ this.isForecast = e == 'forecast'; }
}
