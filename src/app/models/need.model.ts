import {Deserializable} from './deserializable.model';
import {Resource} from './resource.model';
import {Profile} from './profile.model';
import {Project} from './project.model';
import {CalendarValue} from './calendar-value.model';

export class Need implements Deserializable {
  
  	public id: number;
	public profile: Profile;
    public project: Project;
    public requestor: Resource ;
    public calendarValues: CalendarValue[];
    
    public criticity: number;
    public type: number;
    public status: number;
    public numberOfDays: number;
    public startDate: string;
    public endDate: string;
    public isProjectNeed: boolean;
    public comment: string;


	constructor(input?: any) {
    	if (input) {
	  		this.deserialize(input);
    	}
  	}
  
  	deserialize(input: any): this {
    	Object.assign(this, input);

		this.calendarValues = input.calendarValues != null ? input.calendarValues.map(calendarValue => new CalendarValue().deserialize(calendarValue)) : null;

    	return this;
  	}
}