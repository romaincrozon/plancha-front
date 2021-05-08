import { Component, OnInit } from '@angular/core';
import { CalendarRange } from '../../../models/calendar-range.model';
import { CalendarService } from '../../../services/calendar.service';

@Component({
  selector: 'app-need-project-table',
  templateUrl: './need-project-table.component.html'
})
export class NeedProjectTableComponent implements OnInit {

	calendar: any;
	
  	constructor(public calendarService: CalendarService) {
  	}

  	ngOnInit(): void {
  		var calendarRange: CalendarRange;
  		
		/*this.calendarService.getCalendar(this.gridParameters.calendarRange).subscribe((data: {}) => {
			this.calendar = data;
		});*/
  	}

}
