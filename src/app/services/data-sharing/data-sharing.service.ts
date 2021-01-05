import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { CalendarRange } from '../../models/calendar-range.model';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class DataSharingService {

    constructor() { }

    public calendarRange: BehaviorSubject<CalendarRange> = new BehaviorSubject<CalendarRange>(new CalendarRange(null, null));
}