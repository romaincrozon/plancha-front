import {Deserializable} from './deserializable.model';
import {ResourceCalendar} from './resource-calendar.model';
import {CalendarItem} from './calendar-item.model';
import { CalendarValue } from './calendar-value.model';
import { Project } from './project.model';
import { Resource } from './resource.model';

export class WeekItem implements Deserializable {

  	public resource: Resource;
  	public project: Project;
  	public value: CalendarValue;

	constructor(input?: any) {
    	if (input) {
	  		this.deserialize(input);
    	}
  	}
  
  	deserialize(input: any): this {
    	Object.assign(this, input);
    	return this;
  	}
}