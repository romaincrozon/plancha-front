import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { NeedTeam } from '../models/need-team.model';

const endpoint = 'http://localhost:8080/';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
  providedIn: 'root'
})

export class NeedTeamService {

  	constructor(private http: HttpClient) { }

    private extractData(res: Response) {
        let body = res;
        return body || {};
    }

    getNeedTeam(): Observable<NeedTeam[]> {
	    return this.http.get<NeedTeam[]>(endpoint + 'needTeam')
	        .pipe(
	          	map(data => data.map(data => new NeedTeam().deserialize(data))) 
		    );
    }
    
    createNeedTeam(needTeam: NeedTeam): Observable<NeedTeam> {
    	console.log("Create needTeam:" + needTeam);
    	return this.http.post<NeedTeam>(endpoint + 'needTeam', needTeam, httpOptions)
		    .pipe(
		      catchError(this.handleError('Create needTeam ', needTeam))
		    );
    } 
       
    updateNeedTeam(needTeam: NeedTeam): Observable<NeedTeam> {
    	console.log("Update needTeam:" + needTeam);
    	return this.http.put<NeedTeam>(endpoint + 'needTeam', needTeam, httpOptions)
		    .pipe(
		      catchError(this.handleError('Update needTeam ', needTeam))
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