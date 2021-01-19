import {Deserializable} from './deserializable.model';

export class CalendarResourceTask implements Deserializable {
  
  	public id?: number;
  	public calendar?: string;
  	public value?: number;
  	public resourceCalendarId?: number;

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
