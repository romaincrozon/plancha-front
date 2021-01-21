import { Deserializable } from './deserializable.model';
import { Resource } from './resource.model';
import { Task } from './task.model';
import { CalendarItem } from './calendar-item.model';

export class ResourceCalendar implements Deserializable {
  
  	public id: number;
  	public resource: Resource;
  	public task: Task;
  	public calendarItems: CalendarItem[];

	constructor(input?: any) {
    	if (input) {
	  		this.deserialize(input);
    	}
  	}
  	
 	deserialize(input: any): this {
    	Object.assign(this, input);
    	this.calendarItems = input.calendarItems != null ? input.calendarItems.map(calendarItem => new CalendarItem().deserialize(calendarItem)) : null;
		
    	return this;
  	}
}