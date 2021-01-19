import { CalendarRange } from './calendar-range.model';

export class GridParameters {

	calendarRange : CalendarRange;
	view: string;
	
	constructor(calendarRange: CalendarRange, view: string) {
		this.calendarRange = calendarRange;
    	this.view = view;
  	}
}
