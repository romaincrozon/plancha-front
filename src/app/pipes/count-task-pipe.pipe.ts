import { Pipe, PipeTransform } from '@angular/core';
import { CalendarItem } from '../models/calendar-item.model';
import { ResourceCalendar } from '../models/resource-calendar.model';
import { UtilsService } from '../services/utils.service';

@Pipe({
  name: 'countTaskPipe'
})
export class CountTaskPipePipe implements PipeTransform {

  	constructor(public utilsService: UtilsService) {}
  	
  	transform(items: ResourceCalendar[], cal: CalendarItem): number {
    	if(!items) return 0;
		let calendarItems = this.utilsService.mapResourceCalendarsToCalendarItems(items);
		let calendarItemsForDate = calendarItems.filter(calendarItem => this.utilsService.formatDate(calendarItem.calendar) === this.utilsService.formatDate(cal.calendar)).map(c => c.value);
		return calendarItemsForDate.reduce((a, b) => a + b, 0);
   	}
}
