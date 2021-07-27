import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

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
export class CalendarService {

  	constructor(private http: HttpClient) { }
  
  	private extractData(res: Response) {
        let body = res;
        return body || {};
    }

    getCalendar(calendarRange: CalendarRange): Observable<any> {
    	return this.http.post<any>(endpoint + 'calendar', calendarRange, httpOptions)
		    .pipe(
		      catchError(this.handleError('get Calendar for dates', calendarRange))
		    );
    }
    
    getWeekCalendar(): Observable<any> {
    	let currentDate = new Date();
  		currentDate.setFullYear(currentDate.getFullYear()+1);
    	let calendarRange = new CalendarRange(null, new Date().toISOString().slice(0,10), currentDate.toISOString().slice(0,10));
    	console.log(calendarRange);
    	return this.http.post<any>(endpoint + 'calendar', calendarRange, httpOptions)
		    .pipe(
		      catchError(this.handleError('get week Calendar for dates', calendarRange))
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
