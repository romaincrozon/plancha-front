import {Deserializable} from './deserializable.model';
import {Project} from './project.model';
import {SubProject} from './sub-project.model';
import {ResourceCalendar} from './resource-calendar.model';

export class Task implements Deserializable {
  
  	public id: number;
  	public name: string;
  	public status: string;
  	public subprojects: SubProject[];
  	public resourceCalendars: ResourceCalendar[];
  	
	public soldWorkload: number;
	public challengedWorkload: number;
	public consumedWorkload: number;

	constructor(input?: any) {
    	if (input) {
	  		this.deserialize(input);
    	}
  	}
  	
  	deserialize(input: any): this {
    	Object.assign(this, input);

    	this.subprojects = input.subprojects != null ? input.subprojects.map(subproject => new SubProject().deserialize(subproject)) : null;
    	this.resourceCalendars = input.resourceCalendars != null ? input.resourceCalendars.map(resourceCalendar => new ResourceCalendar().deserialize(resourceCalendar)) : null;

    	return this;
  	}
}