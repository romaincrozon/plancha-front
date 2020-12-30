import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calendar/calendar.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html'
})
export class PlanningComponent implements OnInit {

	calendar: any;
  	constructor(public calendarService: CalendarService) { }

  	ngOnInit() {
  	}
}
