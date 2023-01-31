import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { CalendarItem } from '../models/calendar-item.model';
import { CalendarResourceTask } from '../models/calendar-resource-task.model';
import { CalendarRange } from '../models/calendar-range.model';
import { ResourceCalendar } from '../models/resource-calendar.model';
import { WeekItem } from '../models/week-item.model';

const endpoint = 'http://localhost:8080/';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})
export class CalendarItemService {

  	constructor(private http: HttpClient) { }
  
  	private extractData(res: Response) {
        let body = res;
        return body || {};
    }

    createCalendarItem(calendarItem: CalendarItem): Observable<CalendarItem> {
	    return this.http.post<CalendarItem>(endpoint + 'dailyCalendarItem', calendarItem, httpOptions)
		    .pipe(
		      catchError(this.handleError('post Calendar item', calendarItem))
		    );
    }
    
    createResourceCalendar(resourceCalendar: ResourceCalendar): Observable<ResourceCalendar> {
        console.log("resourceCalendar");
	    console.log(resourceCalendar);
	    return this.http.post<ResourceCalendar>(endpoint + 'resourceCalendar', resourceCalendar, httpOptions)
	        .pipe(
                catchError(this.handleError('post resourceCalendar item', resourceCalendar))
            );
    }
    
    
    getCalendarItemsByDate(calendarRange: CalendarRange): Observable<CalendarResourceTask[]> {
    	return this.http.post<CalendarResourceTask[]>(endpoint + 'calendarItemsByDate', calendarRange, httpOptions)
	        .pipe(
	          	map(data => data.map(data => new CalendarResourceTask().deserialize(data))) 
		    );
    }
    
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error); 
            console.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }
}
