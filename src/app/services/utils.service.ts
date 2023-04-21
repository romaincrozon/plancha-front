import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

import { appProperties } from '../app.messages';

import { CalendarItem } from '../models/calendar-item.model';
import { ResourceCalendar } from '../models/resource-calendar.model';
import { Task } from '../models/task.model';
import { SubProject } from '../models/sub-project.model';
import { Project } from '../models/project.model';
import { Resource } from '../models/resource.model';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  	constructor(private datepipe: DatePipe) { }
  
	getObjectById(array, id){
		if (array != null && id != null){
			return array.find(node => node.id == id);
		}
		return null;
	}
	
	formatDate(date: string): string{
		return this.datepipe.transform(date, 'yyyy-MM-dd');
	}
	
	mapProjectToCalendarItems(item: Project, cal: CalendarItem){
		let array = [].concat.apply([], item.resourceCalendars.map(resourceCalendar => {
			return resourceCalendar.calendarItems.filter(calendarItem => this.formatDate(calendarItem.calendar) === this.formatDate(cal.calendar))
		}));
		let subItemArray = item.projects ? item.projects.map(project => this.mapProjectToCalendarItems(project, cal)) : null;
		console.log("subItemArray")
		console.log(subItemArray)
		if (subItemArray && subItemArray.length != 0){
			subItemArray.map(a => {
				array.concat(a)
			})
		}
		console.log(array);
		return array;
	}
	
	getProperty(message : string, feature : string, item: string): any {
		return message ? feature ? item ? appProperties[message][feature][item] : appProperties[message][feature] : appProperties[message] : "";
  	}
  	
	filterByName(objects: any[], value: string): any[] {
	    const filterValue = value.toLowerCase();
	   	return objects.filter(object => object.name.toLowerCase().indexOf(filterValue) === 0);
	}
	filterByQuadri(objects: any[], value: string): any[] {
		console.log("filterByQuadri");
		console.log(objects);
	    console.log(value);
		if (objects && value){
			const filterValue = value.toLowerCase();
			return objects.filter(object => object.quadri.toLowerCase().indexOf(filterValue) === 0);
		}
		return [];
	}
	
	getResourceById(resources: Resource[], resourceId: string): Resource{
		if (resourceId != null){
			let item = resources.find(node => node.id == resourceId);
			return item;
		}
		return null
	}
}
