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
		console.log("item");
    	console.log(item);
    	if(!item) return 0;
		let calendarItems = this.utilsService.mapProjectToCalendarItems(item);
		console.log("calendarItems");
		console.log(calendarItems);
		let calendarItemsForDate = calendarItems.filter(calendarItem => {
			console.log(this.utilsService.formatDate(calendarItem.calendar) + "|" + this.utilsService.formatDate(cal.calendar));
			return this.utilsService.formatDate(calendarItem.calendar) === this.utilsService.formatDate(cal.calendar)
		}).map(c => c.value)
		
		console.log("calendarItemsForDate ");
		console.log(calendarItemsForDate);
		return calendarItemsForDate.reduce((a, b) => a + b, 0);
   	}

}
