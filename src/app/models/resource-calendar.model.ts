import {Deserializable} from './deserializable.model';
import {Resource} from './resource.model';
import {TaskCalendar} from './task-calendar.model';

export class ResourceCalendar implements Deserializable {
  
  	public id: number;
  	public resource: Resource;
  	public taskCalendars: TaskCalendar[];

	constructor(input?: any) {
    	if (input) {
	  		this.deserialize(input);
    	}
  	}
  	
 	deserialize(input: any): this {
    	Object.assign(this, input);

    	this.taskCalendars = input.taskCalendars != null ? input.taskCalendars.map(taskCalendar => new TaskCalendar().deserialize(taskCalendar)) : null;

    	return this;
  	}
}