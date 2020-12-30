import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

import { CalendarRange } from '../../models/calendar-range.model';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class DataSharingService {

    constructor(private calendar: NgbCalendar) { }

    public calendarRange: BehaviorSubject<CalendarRange> = new BehaviorSubject<CalendarRange>(new CalendarRange(this.calendar, null, null));
}