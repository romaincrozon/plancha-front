import {Deserializable} from './deserializable.model';
import {ResourceCalendar} from './resource-calendar.model';

export class CalendarItem implements Deserializable {
  
  	public id: number;
  	public resourceCalendar: ResourceCalendar;
  	public calendar: string;
  	public value: number;
  	public holiday: boolean;

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