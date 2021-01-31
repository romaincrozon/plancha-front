import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { Request } from '../models/request.model';

const endpoint = 'http://localhost:8080/';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  	constructor(private http: HttpClient) { }

    private extractData(res: Response) {
        let body = res;
        return body || {};
    }

    getRequests(): Observable<Request[]> {
	    return this.http.get<Request[]>(endpoint + 'request')
	        .pipe(
	          	map(data => data.map(data => new Request().deserialize(data))) 
		    );
    }
    
    getRequestsByProject(idProject: string): Observable<Request[]> {
        return this.http.get<Request[]>(endpoint + 'request/project/' + idProject)
	        .pipe(
	          	map(data => data.map(data => new Request().deserialize(data))) 
		    );
    }
    
    getRequestById(id: string): Observable<Request> {
    	return this.http.get<Request>(endpoint + 'request/' + id);    
    }

    createRequest(request: Request): Observable<Request> {
    	console.log("Create request:" + request);
    	return this.http.post<Request>(endpoint + 'request', request, httpOptions)
		    .pipe(
		      catchError(this.handleError('Create request ', request))
		    );
    } 
       
    updateRequest(request: Request): Observable<Request> {
    	console.log("Update request:" + request);
    	return this.http.put<Request>(endpoint + 'request', request, httpOptions)
		    .pipe(
		      catchError(this.handleError('Update request ', request))
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
