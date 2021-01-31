import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { CalendarItem } from '../models/calendar-item.model';
import { CalendarResourceTask } from '../models/calendar-resource-task.model';
import { CalendarRange } from '../models/calendar-range.model';

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
    
    createWeekItem(weekItem: any): Observable<CalendarItem[]> {
	    return this.http.post<CalendarItem[]>(endpoint + 'weeklyCalendarItem', weekItem, httpOptions)
	        .pipe(
	          	map(data => data.map(data => new CalendarItem().deserialize(data))) 
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

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
