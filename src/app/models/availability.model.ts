import {Deserializable} from './deserializable.model';
import {Resource} from './resource.model';
import {CalendarValue} from './calendar-value.model';

export class Availability implements Deserializable {

  	public id: number;
	public resource: Resource;
    public implication: number;
    public requestor: Resource;
    public calendarValues: CalendarValue[];
    
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