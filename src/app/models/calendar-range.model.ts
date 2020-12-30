import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

export class CalendarRange {
  
  	fromDate: NgbDate | null;
  	toDate: NgbDate | null;

	constructor(private calendar: NgbCalendar, fromDate: NgbDate, toDate: NgbDate) {
    	this.fromDate = (fromDate == null) ? calendar.getToday() : fromDate;
    	this.toDate = (toDate == null) ? calendar.getNext(calendar.getToday(), 'd', 10) : toDate;
  	}
  	
}