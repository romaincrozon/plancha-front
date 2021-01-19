import { ResourceCalendar } from '../models/resource-calendar.model';
import { CalendarResourceTask } from '../models/calendar-resource-task.model';
import { GridParameters } from '../models/grid-parameters.model';

export interface RowComponent {
  
	calendarResourceTasks: CalendarResourceTask[];
	gridParameters: GridParameters;
  	resourceCalendar: ResourceCalendar;
}
