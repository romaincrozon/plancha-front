import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { SubProject } from '../../models/sub-project.model';

const endpoint = 'http://localhost:8080/';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})
export class SubProjectService {

    constructor(private http: HttpClient) { }

    private extractData(res: Response) {
        let body = res;
        return body || {};
    }

    getSubProjects(): Observable<SubProject[]> {
        return this.http.get<SubProject[]>(endpoint + 'subProject').pipe(
          	map(data => data.map(data => new SubProject().deserialize(data))) 
	    );
    }
    
    getSubProjectById(id: string): Observable<SubProject> {
    	return this.http.get<SubProject>(endpoint + 'subProject');    
	}
	
    getSubProjectsByProjectId(id: number): Observable<SubProject[]> {
    	return this.http.get<SubProject[]>(endpoint + 'project/' + id + '/subProject').pipe(
          	map(data => data.map(data => new SubProject().deserialize(data))) 
	    );    
	}
    
    createSubProject(subproject: SubProject): Observable<SubProject> {
    	console.log("Create subproject :" + subproject);
    	return this.http.post<SubProject>(endpoint + 'subProject', subproject, httpOptions)
		    .pipe(
		      catchError(this.handleError('Create subproject ', subproject))
		    );
    }
    
    updateSubProject(subproject: SubProject): Observable<SubProject> {
    	console.log("Update subproject :" + subproject);
    	return this.http.put<SubProject>(endpoint + 'subproject', subproject, httpOptions)
		    .pipe(
		      catchError(this.handleError('Update subproject ', subproject))
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
