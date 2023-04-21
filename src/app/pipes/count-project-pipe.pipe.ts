import { Pipe, PipeTransform } from '@angular/core';
import { CalendarItem } from '../models/calendar-item.model';
import { Project } from '../models/project.model';
import { UtilsService } from '../services/utils.service';

@Pipe({
  name: 'countProjectPipe'
})
export class CountProjectPipePipe implements PipeTransform {

  	constructor(public utilsService: UtilsService) {}
  	
  	transform(item: Project, cal: CalendarItem): number {
		console.log(this.utilsService.formatDate(cal.calendar) + "|" + item.name);
		if(!item) return 0;
		let calendarItems = this.utilsService.mapProjectToCalendarItems(item, cal);
		console.log(calendarItems);
		let calendarItemsForDate = calendarItems.map(c => c.value)
		return calendarItemsForDate.reduce((a, b) => a + b, 0);
   	}

}
