import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { Availability } from '../models/availability.model';

const endpoint = 'http://localhost:8080/';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
  providedIn: 'root'
})

export class AvailabilityService {

  	constructor(private http: HttpClient) { }

    private extractData(res: Response) {
        let body = res;
        return body || {};
    }

    getAvailabilities(): Observable<Availability[]> {
	    return this.http.get<Availability[]>(endpoint + 'availability')
	        .pipe(
	          	map(data => data.map(data => new Availability().deserialize(data))) 
		    );
    }
    
    createAvailability(availability: Availability): Observable<Availability> {
    	console.log("Create availability:" + availability);
    	return this.http.post<Availability>(endpoint + 'availability', availability, httpOptions)
		    .pipe(
		      catchError(this.handleError('Create availability ', availability))
		    );
    } 
       
    updateAvailability(availability: Availability): Observable<Availability> {
    	console.log("Update availability:" + availability);
    	return this.http.put<Availability>(endpoint + 'availability', availability, httpOptions)
		    .pipe(
		      catchError(this.handleError('Update availability ', availability))
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
