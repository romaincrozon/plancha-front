import {Deserializable} from './deserializable.model';
import {Project} from './project.model';
import {SubProject} from './sub-project.model';
import {TaskCalendar} from './task-calendar.model';

export class Task implements Deserializable {
  
  	public id: number;
  	public name: string;
  	public status: string;
  	public subprojects: SubProject[];
  	public taskCalendars: TaskCalendar[];

	constructor(input?: any) {
    	if (input) {
	  		this.deserialize(input);
    	}
  	}
  	
  	deserialize(input: any): this {
    	Object.assign(this, input);

    	this.subprojects = input.subprojects != null ? input.subprojects.map(subproject => new SubProject().deserialize(subproject)) : null;
    	this.taskCalendars = input.taskCalendars != null ? input.taskCalendars.map(taskCalendar => new TaskCalendar().deserialize(taskCalendar)) : null;

    	return this;
  	}
}