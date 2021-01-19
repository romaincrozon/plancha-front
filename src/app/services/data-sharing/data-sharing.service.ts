import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { GridParameters } from '../../models/grid-parameters.model';
import { ResourceCalendar } from '../../models/resource-calendar.model';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class DataSharingService {

    constructor() { }

    public gridParameters: BehaviorSubject<GridParameters> = new BehaviorSubject<GridParameters>(new GridParameters(null, 'days'));
	//public resourceCalendarMap: BehaviorSubject<Map> = new BehaviorSubject<Map>(new Map());

}