import { Type } from '@angular/core';
import { ResourceCalendar } from '../../models/resource-calendar.model';
import { CalendarResourceTask } from '../../models/calendar-resource-task.model';
import { GridParameters } from '../../models/grid-parameters.model';


export class planningRowItem {
  	constructor(public component: Type<any>, 
  		public calendarResourceTasks: CalendarResourceTask[],
		public gridParameters: GridParameters,
		public resourceCalendar: ResourceCalendar
  	) {}
}