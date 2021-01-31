import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Resource } from '../../models/resource.model';

@Component({
  selector: "app-resources-table",
  templateUrl: "resources-table.component.html"
})
export class ResourcesTableComponent implements OnInit {

  	@Input() resourceList: Resource[];
  	
	constructor(public projectService: ProjectService, private router:Router, private activatedRoute:ActivatedRoute) { }

  	ngOnInit() {
  	}
}
