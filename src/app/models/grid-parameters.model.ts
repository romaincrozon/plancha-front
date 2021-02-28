import { CalendarRange } from './calendar-range.model';
import { Project } from './project.model';

export class GridParameters {

	calendarRange : CalendarRange;
	view: string;
	projects: Project[];
	
	constructor(calendarRange: CalendarRange, view: string, projects: Project[]) {
		this.calendarRange = calendarRange;
    	this.view = view;
    	this.projects = projects;
  	}
}
