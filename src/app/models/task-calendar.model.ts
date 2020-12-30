import {Deserializable} from './deserializable.model';
import {Resource} from './resource.model';
import {Task} from './task.model';

export class TaskCalendar implements Deserializable {
  
  	public id: number;
  	public resource: Resource;
  	public tasks: Task;
  	public calendar: string;

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