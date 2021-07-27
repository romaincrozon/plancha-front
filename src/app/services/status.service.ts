import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { Status } from '../models/status.model';

const endpoint = 'http://localhost:8080/';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
  providedIn: 'root'
})
export class StatusService {

	constructor(private http: HttpClient) { }

    private extractData(res: Response) {
        let body = res;
        return body || {};
    }

    getStatus(): Observable<Status[]> {
        return this.http.get<Status[]>(endpoint + 'status').pipe(
          	map(data => data.map(data => new Status().deserialize(data))) 
	    );
    }
    
    getStatusById(id: string): Observable<Status> {
    	return this.http.get<Status>(endpoint + 'status/' + id);    
	}
	
    createStatus(status: Status): Observable<Status> {
    	return this.http.post<Status>(endpoint + 'status', status, httpOptions)
		    .pipe(
		      catchError(this.handleError('Create status ', status))
		    );
    }
    
    updateStatus(status: Status): Observable<Status> {
    	console.log("Update status :" + status);
    	return this.http.put<Status>(endpoint + 'status', status, httpOptions)
		    .pipe(
		      catchError(this.handleError('Update status ', status))
		    );
    }
    
    delete(status: Status): void {
    	console.log("Delete status:" + status);
    	this.http.delete(endpoint + 'status/' + status.id).subscribe(() => console.log('Delete successful'));
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
