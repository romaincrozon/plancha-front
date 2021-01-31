import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { Resource } from '../models/resource.model';

const endpoint = 'http://localhost:8080/';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})
export class ResourceService {

    constructor(private http: HttpClient) { }

    private extractData(res: Response) {
        let body = res;
        return body || {};
    }
 
    getResourceById(resourceId : string): Observable<Resource> {
        return this.http.get<Resource>(endpoint + 'resource/' + resourceId)
        /*.pipe(
        	map(data => new Resource().deserialize(data)),
          	catchError(() => throwError('Resource not found'))
	    )*/;
    }
    
    getResourcesByProject(projectId : string): Observable<Resource[]> {
        return this.http.get<Resource[]>(endpoint + 'project/' + projectId + '/resources').pipe(
          	map(data => data.map(data => new Resource().deserialize(data))) 
	    );
    }
    
    getAll(): Observable<Resource[]> {
        return this.http.get<Resource[]>(endpoint + 'resource').pipe(
          	map(data => data.map(data => new Resource().deserialize(data))) 
	    );
    }
    
    register(resource: Resource): Observable<Resource> {
        return this.http.post<Resource>(endpoint + '/signup', resource)
        	.pipe(
		      catchError(this.handleError('post Resource', resource))
		    );
    }

    delete(id: number) {
        return this.http.delete(endpoint + '/resource/${id}');
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
