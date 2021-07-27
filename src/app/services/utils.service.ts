import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

import { appProperties } from '../app.messages';

import { CalendarItem } from '../models/calendar-item.model';
import { ResourceCalendar } from '../models/resource-calendar.model';
import { Task } from '../models/task.model';
import { SubProject } from '../models/sub-project.model';

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
	
	mapResourceCalendarsToCalendarItems(items: ResourceCalendar[]){
		return [].concat.apply([], items.map(resourceCalendar => resourceCalendar.calendarItems));
	}
	
	mapTaskToCalendarItems(items: Task[]){
		return [].concat.apply([], items.map(task => this.mapResourceCalendarsToCalendarItems(task.resourceCalendars)));
	}
	
	mapSubProjectToCalendarItems(items: any[]){
		return [].concat.apply([], items.map(subproject => this.mapTaskToCalendarItems(subproject.taskList)));
	}
	
	getProperty(message : string, feature : string, item: string): any {
		return message ? feature ? item ? appProperties[message][feature][item] : appProperties[message][feature] : appProperties[message] : "";
  	}
  	
	filterByName(objects: any[], value: string): any[] {
	    const filterValue = value.toLowerCase();
	   	return objects.filter(object => object.name.toLowerCase().indexOf(filterValue) === 0);
	}
}
