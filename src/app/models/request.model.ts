import {Deserializable} from './deserializable.model';
import {Project} from './project.model';
import {Assignment} from './assignment.model';
import {Profile} from './profile.model';

export class Request implements Deserializable {
  
  	public id: string;
  	public daysPerWeek: number;
  	public totalDays: number;
  	public beginDate: string;
  	public endDate: string;
  	public project: Project;
  	public assignments: Assignment[];
  	public profile: Profile;

  	constructor(input?: any) {
    	if (input) {
	  		this.deserialize(input);
    	}
  	}
  
  	deserialize(input: any): this {
    	Object.assign(this, input);

    	this.assignments = input.assignments != null ? input.assignments.map(assignment => new Assignment().deserialize(assignment)) : null;

    	return this;
  	}
}