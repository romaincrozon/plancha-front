import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countTaskPipe'
})
export class CountTaskPipePipe implements PipeTransform {

  	transform(items: any[]): any[] {
  		console.log(items);
    	if(!items) return [];
    	
		//let calendarItems = items.map(resourceCalendar => resourceCalendar.calendarItems).filter(calendar => );
    	//console.log(calendarItems);
		return items.reduce((a, b) => { 
			console.log(a.value + b.value);
			return a.value + b.value;}, {});
   	}
}
