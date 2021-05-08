import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { NeedProject } from '../models/need-project.model';

const endpoint = 'http://localhost:8080/';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
  providedIn: 'root'
})

export class NeedProjectService {

  	constructor(private http: HttpClient) { }

    private extractData(res: Response) {
        let body = res;
        return body || {};
    }

    getNeedProject(): Observable<NeedProject[]> {
	    return this.http.get<NeedProject[]>(endpoint + 'needProject')
	        .pipe(
	          	map(data => data.map(data => new NeedProject().deserialize(data))) 
		    );
    }
    
    createNeedProject(needProject: NeedProject): Observable<NeedProject> {
    	console.log("Create availability:" + needProject);
    	return this.http.post<NeedProject>(endpoint + 'needProject', needProject, httpOptions)
		    .pipe(
		      catchError(this.handleError('Create needProject', needProject))
		    );
    } 
       
    updateNeedProject(needProject: NeedProject): Observable<NeedProject> {
    	console.log("Update needProject:" + needProject);
    	return this.http.put<NeedProject>(endpoint + 'needProject', needProject, httpOptions)
		    .pipe(
		      catchError(this.handleError('Update needProject ', needProject))
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