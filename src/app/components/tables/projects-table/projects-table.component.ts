import { Component, Directive, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from "@angular/core";
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
 
import { CreateProjectModalComponent } from '../../modals/create-project-modal/create-project-modal.component';
import { DeleteModalComponent } from '../../modals/delete-modal/delete-modal.component';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project.model';
import { SortableHeader, SortEvent } from "src/app/directives/sortable-header";
import { FormBuilder, FormGroup } from "@angular/forms";

const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

@Component({
  selector: "app-projects-table",
  templateUrl: "projects-table.component.html"
})
export class ProjectsTableComponent implements OnInit {
  	isCollapsedMap = new Map<string, boolean>(); 
  	projects: Project[];
  	sortedProjects: Project[];
  	filtersForm: FormGroup;
	@ViewChildren(SortableHeader) headers: QueryList<SortableHeader>;
	  
	constructor(private projectService: ProjectService, private modalService: NgbModal, private fb:FormBuilder, ) { }

  	ngOnInit() {
		this.projectService.getProjects().subscribe(data => {
			this.projects = data;
			this.setCollapsedMap(this.projects);
		});
		this.filtersForm = this.fb.group({
			searchText:''
	  });
  	}

	setCollapsedMap(projects: Project[]){
		for (var item of projects){
			this.isCollapsedMap.set(item.id, true);
			this.setCollapsedMap(item.projects);
		}
	}

	toggle(id: string){ this.isCollapsedMap.set(id, !this.isCollapsedMap.get(id));}
	isCollapsed(id: string): boolean{ return this.isCollapsedMap.get(id); }
	updateFilter(selectedProjects: Project[]){ this.projects = selectedProjects; }

	// onSort({ column, direction }: SortEvent) {
	// 	// resetting other headers
	// 	this.headers.forEach((header) => {
	// 		if (header.sortable !== column) {
	// 			header.direction = '';
	// 		}
	// 	});

	// 	// sorting countries
	// 	if (direction === '' || column === '') {
	// 		this.sortedProjects = this.projects;
	// 	} else {
	// 		// this.sortedProjects = [...this.projects].sort((a, b) => {
	// 		// 	const res = compare(a[column], b[column]);
	// 		// 	return direction === 'asc' ? res : -res;
	// 		// });
	// 	}
	// }

	createProject(project: Project | null) {
		const modalRef = this.modalService.open(CreateProjectModalComponent, {size: 'lg', windowClass: 'modal-xl'});
		modalRef.componentInstance.parent = project;
  
		modalRef.result.then((result) => {
			this.projects.push(result);
		}).catch((error) => {
		  console.log(error);
		});
  	}
  	
  	openDeleteModal(project: Project) {
		const modalRef = this.modalService.open(DeleteModalComponent);
	    modalRef.componentInstance.service = this.projectService;
		modalRef.componentInstance.object = project;
		modalRef.componentInstance.name = project.name;

		modalRef.result.then((result) => {
			this.projects.splice(this.projects.indexOf(project), 1);
		}).catch((error) => {
		  	console.log(error);
		});
  	}
}





