import { Pipe, PipeTransform } from '@angular/core';
import { CalendarItem } from '../models/calendar-item.model';
import { Project } from '../models/project.model';
import { UtilsService } from '../services/utils.service';

@Pipe({
  name: 'countProjectPipe'
})
export class CountProjectPipePipe implements PipeTransform {

  	constructor(public utilsService: UtilsService) {}
  	
  	transform(items: Project[], cal: CalendarItem): number {
    	if(!items) return 0;
		let calendarItems = this.utilsService.mapProjectToCalendarItems(items);
		let calendarItemsForDate = calendarItems.filter(calendarItem => this.utilsService.formatDate(calendarItem.calendar) === this.utilsService.formatDate(cal.calendar)).map(c => c.value);
		return calendarItemsForDate.reduce((a, b) => a + b, 0);
   	}

}
