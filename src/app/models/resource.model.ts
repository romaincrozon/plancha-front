import {Deserializable} from './deserializable.model';
import {ResourceCalendar} from './resource-calendar.model';
import {Project} from './project.model';
import {Profile} from './profile.model';
import {Assignment} from './assignment.model';

export class Resource implements Deserializable {
  
  	public id: number;
  	public firstname: string;
  	public lastname: string;
  	public username: string;
  	public password: string;
  	public quadri: string;
  	public role: string;
  	public availabilityPerWeek: number;
    public token: string;
    public cost: number;

  	public resourceCalendar: ResourceCalendar;
  	public projects: Project[];
  	//public profiles: String;
  	public profiles: Profile[];
  	public assignments: Assignment[];

	constructor(input?: any) {
    	if (input) {
	  		this.deserialize(input);
    	}
  	}
  	
  	deserialize(input: any): this {
    	Object.assign(this, input);

    	this.projects = input.projects != null ? input.projects.map(project => new Project().deserialize(project)) : null;
		this.profiles = input.profiles != null ? input.profiles.map(profile => new Profile().deserialize(profile)) : null;
		this.assignments = input.assignments != null ? input.assignments.map(assignment => new Assignment().deserialize(assignment)) : null;
 
    	return this;
  	}
}