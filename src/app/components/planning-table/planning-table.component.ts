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
import { AddResourceToProjectModalComponent } from '../modals/add-resource-to-project-modal/add-resource-to-project-modal.component';
import { ResourceService } from 'src/app/services/resource.service';
import { Resource } from 'src/app/models/resource.model';

@Component({
  selector: 'app-planning-table',
  templateUrl: './planning-table.component.html'
})
export class PlanningTableComponent implements OnInit {
	
	@Input() gridParameters: GridParameters;
	isCollapsedMap = new Map<string, boolean>(); 
	
	calendar: any;
	calendarItems: CalendarItem[];
	projects: Project[];
	allProjects: Project[];
	resources: Resource[];
  	
	@ViewChildren('count') count;
	@ViewChildren('cells') cells;
  
  	constructor(public calendarService: CalendarService, 
		public projectService: ProjectService, 
		public resourceService: ResourceService, 
		public calendarItemService: CalendarItemService,
  		public dataSharingService: DataSharingService,
  		private utilsService: UtilsService,
		private modalService: NgbModal,
  		private datepipe: DatePipe) {
  	}

  	ngOnInit(): void {
		this.projectService.getProjectsWithNoParent().subscribe(data => {
			this.projects = data;
			this.setCollapsedMap(this.projects);
		});
		this.projectService.getAllProjects().subscribe(data => {
			this.allProjects = data;
		});
		this.resourceService.getAll().subscribe(data => {
			this.resources = data;
		});
		let currentDate = new Date();
  		currentDate.setMonth(currentDate.getMonth()+1);
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
				this.calendarService.getCalendar(this.gridParameters.calendarRange).subscribe(data => {
					this.calendar = data;
				});
				this.calendarItemService.getCalendarItemsByDate(this.gridParameters.calendarRange).subscribe(data => {
					this.calendarItems = data;
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
  	
	getFirstDayOfWeek(week: any){
		if (week){
			let firstDay = week.planchaCalendars.find(planchaCalendar => planchaCalendar.dayNumberInWeek == 1)
			return this.datepipe.transform(firstDay.calendar, 'dd/MM'); 
		}
		return null;
	}

	sum(cell) {
        let items = this.count.toArray().filter(element => this.utilsService.formatDate(element.nativeElement.getAttribute("data-calendar")) == this.utilsService.formatDate(cell.calendar));
        console.log(items);
		if (items){
    		items.forEach((item, index) => {
				console.log(item.nativeElement.innerHTML);
    			if (item.nativeElement.getAttribute('data-project-id') && item.nativeElement.getAttribute('data-project-id') == cell.projectId){
    				item.nativeElement.innerHTML = Number(item.nativeElement.innerHTML) + Number(cell.value);
	        	} else if (item.nativeElement.getAttribute('data-subItem-id') && item.nativeElement.getAttribute('data-subItem-id') == cell.subItemId){
    				item.nativeElement.innerHTML = Number(item.nativeElement.innerHTML) + Number(cell.value);
    			} else if (item.nativeElement.getAttribute('data-subSubItem-id') && item.nativeElement.getAttribute('data-subSubItem-id') == cell.subSubItemId){
    				item.nativeElement.innerHTML = Number(item.nativeElement.innerHTML) + Number(cell.value);
	        	}  
    		});
    	}
    }
	
	computeCell(project: Project, date: string) {
        let items = this.cells.toArray().filter(element => this.utilsService.formatDate(element.nativeElement.getAttribute("data-cell-calendar")) == this.utilsService.formatDate(date));
        console.log(items);
		let value = 0;
		if (items){
    		items.forEach((item, index) => {
				console.log(item.nativeElement.innerHTML);
    			if (item.nativeElement.getAttribute('data-cell-project-id') && item.nativeElement.getAttribute('data-cell-project-id') == project.id){
    				value += Number(item.nativeElement.innerHTML);
	        	}
    		});
    	}
    }
  	
	openAddResourceToProjectModal(project: Project){
		const modalRef = this.modalService.open(AddResourceToProjectModalComponent);
		modalRef.componentInstance.project = project;
		modalRef.result.then((result) => {
			project = result;
		}).catch((error) => {
			console.log(error);
		});
	}
}
