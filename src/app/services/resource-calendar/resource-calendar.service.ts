import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { ResourceCalendar } from '../../models/resource-calendar.model';
import { CalendarRange } from '../../models/calendar-range.model';
import { Task } from '../../models/task.model';
import { TaskResource } from '../../models/task-resource.model';

const endpoint = 'http://localhost:8080/';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})

export class ResourceCalendarService {

  	constructor(private http: HttpClient) { }

  	private extractData(res: Response) {
        let body = res;
        return body || {};
    }

    getResourceCalendarsByDateAndTask(calendarRange: CalendarRange, task: Task): Observable<ResourceCalendar[]> {
    	return this.http.post<ResourceCalendar[]>(endpoint + 'resourceCalendarsByDate/task/' + task.id, calendarRange, httpOptions)
	        .pipe(
	          	map(data => data.map(data => new ResourceCalendar().deserialize(data))) 
		    );
    }

    createResourceCalendar(resourceCalendar: ResourceCalendar): Observable<ResourceCalendar> {
	    return this.http.post<ResourceCalendar>(endpoint + 'resourceCalendar', resourceCalendar, httpOptions)
		    .pipe(
		      catchError(this.handleError('post Resource Calendar', resourceCalendar))
		    );
    }
    
    createResourceCalendarFromTaskAndResource(taskResource: TaskResource): Observable<any> {
	    return this.http.post<ResourceCalendar>(endpoint + 'resourceCalendarByTaskAndResource', taskResource, httpOptions)
		    .pipe(
		      catchError(this.handleError('post task resource', taskResource))
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