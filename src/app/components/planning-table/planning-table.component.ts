import { Component, Input, OnInit, ViewChildren, ComponentFactoryResolver, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarService } from '../../services/calendar.service';
import { ProjectService } from '../../services/project.service';
import { CalendarItemService } from '../../services/calendar-item.service';
import { DataSharingService } from '../../services/data-sharing.service';
import { UtilsService } from '../../services/utils.service';
import { DatePipe } from '@angular/common'
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { Project } from '../../models/project.model';
import { CalendarItem } from '../../models/calendar-item.model';
import { CalendarRange } from '../../models/calendar-range.model';
import { CalendarResourceTask } from '../../models/calendar-resource-task.model';
import { GridParameters } from '../../models/grid-parameters.model';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { DirectiveAddresourceDirective } from '../../directives/directive-addresource.directive';
import { ResourceCalendar } from '../../models/resource-calendar.model';

@Component({
  selector: 'app-planning-table',
  templateUrl: './planning-table.component.html'
})
export class PlanningTableComponent implements OnInit {
	
	@Input() gridParameters: GridParameters;
	isCollapsedMap = new Map<string, boolean>(); 
	
	calendar: any;
	projects: Project[];
	allProjects: Project[];
  	
  	@ViewChildren('count') count;
  
  	constructor(public calendarService: CalendarService, 
  		public projectService: ProjectService, 
  		public dataSharingService: DataSharingService,
  		private modalService: NgbModal,
  		private utilsService: UtilsService,
  		private datepipe: DatePipe) {
  	}

  	ngOnInit(): void {
		this.projectService.getProjects().subscribe(data => {
			this.projects = data;
			this.setCollapsedMap(this.projects);
			console.log("projects");
			console.log(this.projects);
			
			this.allProjects = data;
		});
		let currentDate = new Date();
  		currentDate.setMonth(currentDate.getMonth()+1);
     	let formattedDate=currentDate.toISOString().slice(0,10);
		this.calendarService.getCalendar(new CalendarRange(this.datepipe, new Date().toISOString(), currentDate.toISOString())).subscribe((data: {}) => {
			this.calendar = data;
		});
		
	  	this.dataSharingService.gridParameters.subscribe( value => {
	        this.gridParameters = value;
	        if (this.gridParameters
	        		&& this.gridParameters.calendarRange
	        		&& this.gridParameters.calendarRange.startDate
		        	&& this.gridParameters.calendarRange.endDate
		        	&& this.gridParameters.view
		        	&& this.gridParameters.projects){
				this.calendarService.getCalendar(this.gridParameters.calendarRange).subscribe((data: {}) => {
					this.calendar = data;
					console.log(this.calendar);
				});
				this.projects = this.gridParameters.projects;
			}
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
  	
	sum(cell) {
        let items = this.count.toArray().filter(element => this.utilsService.formatDate(element.nativeElement.getAttribute("data-calendar")) == this.utilsService.formatDate(cell.calendar));
    	if (items){
    		items.forEach((item, index) => {
    			if (item.nativeElement.getAttribute('data-task-id') && item.nativeElement.getAttribute('data-task-id') == cell.taskId){
    				item.nativeElement.innerHTML = Number(item.nativeElement.innerHTML) + Number(cell.value);
	        	} else if (item.nativeElement.getAttribute('data-subproject-id') && item.nativeElement.getAttribute('data-subproject-id') == cell.subprojectId){
    				item.nativeElement.innerHTML = Number(item.nativeElement.innerHTML) + Number(cell.value);
    			} else if (item.nativeElement.getAttribute('data-project-id') && item.nativeElement.getAttribute('data-project-id') == cell.projectId){
    				item.nativeElement.innerHTML = Number(item.nativeElement.innerHTML) + Number(cell.value);
	        	}  
    		});
    	}
    }
  	
  	// openFormModal() {
	// 	const modalRef = this.modalService.open(AddResourceToTaskModalComponent);
	// 	//modalRef.componentInstance.resources = resources;
		
	// 	modalRef.result.then((result) => {
	// 		//this.getRequests();
	// 	}).catch((error) => {
	// 	  console.log(error);
	// 	});
  	// }
}
