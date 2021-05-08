import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { TaskType } from '../models/task-type.model';

const endpoint = 'http://localhost:8080/';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};
@Injectable({
  providedIn: 'root'
})
export class TaskTypeService {
	
	constructor(private http: HttpClient) { }
  
  	private extractData(res: Response) {
        let body = res;
        return body || {};
    }

    getTaskTypes(): Observable<TaskType[]> {
        return this.http.get<TaskType[]>(endpoint + 'taskType')
        .pipe(
          	map(data => data.map(data => new TaskType().deserialize(data))) 
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
