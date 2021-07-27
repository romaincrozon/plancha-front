import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { Need } from '../models/need.model';

const endpoint = 'http://localhost:8080/';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
  providedIn: 'root'
})

export class NeedService {

  	constructor(private http: HttpClient) { }

    private extractData(res: Response) {
        let body = res;
        return body || {};
    }

    getProjectNeeds(): Observable<Need[]> {
	    return this.http.get<Need[]>(endpoint + 'need/project')
	        .pipe(
	          	map(data => data.map(data => new Need().deserialize(data))) 
		    );
    }
    
    getTeamNeeds(): Observable<Need[]> {
	    return this.http.get<Need[]>(endpoint + 'need/team')
	        .pipe(
	          	map(data => data.map(data => new Need().deserialize(data))) 
		    );
    }
    
    createNeedProject(need: Need): Observable<Need> {
    	console.log("Create need:" + need);
    	return this.http.post<Need>(endpoint + 'need', need, httpOptions)
		    .pipe(
		      catchError(this.handleError('Create need', need))
		    );
    } 
       
    updateNeedProject(need: Need): Observable<Need> {
    	console.log("Update need:" + need);
    	return this.http.put<Need>(endpoint + 'need', need, httpOptions)
		    .pipe(
		      catchError(this.handleError('Update need ', need))
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