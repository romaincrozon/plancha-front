import {Deserializable} from './deserializable.model';
import {CalendarItem} from './calendar-item.model'; 

export class Week implements Deserializable {

  	public calendars: CalendarItem[];

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