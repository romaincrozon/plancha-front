import { Pipe, PipeTransform } from '@angular/core';
import { CalendarItem } from '../models/calendar-item.model';
import { Task } from '../models/task.model';
import { UtilsService } from '../services/utils.service';

@Pipe({
  name: 'countSubprojectPipe'
})
export class CountSubprojectPipePipe implements PipeTransform {
  	
  	constructor(public utilsService: UtilsService) {}
  	
  	transform(items: Task[], cal: CalendarItem): number {
    	if(!items) return 0;
		let calendarItems = this.utilsService.mapTaskToCalendarItems(items);
		let calendarItemsForDate = calendarItems.filter(calendarItem => this.utilsService.formatDate(calendarItem.calendar) === this.utilsService.formatDate(cal.calendar)).map(c => c.value);
		return calendarItemsForDate.reduce((a, b) => a + b, 0);
   	}

}
