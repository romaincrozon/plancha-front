import {Deserializable} from './deserializable.model';
import {ResourceCalendar} from './resource-calendar.model';
import {CalendarItem} from './calendar-item.model';

export class WeekItem implements Deserializable {

  	public resourceCalendarId: number;
  	public calendars: CalendarItem[];
  	public value: number;

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