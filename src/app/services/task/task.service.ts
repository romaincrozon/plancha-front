import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { Task } from '../../models/task.model';

const endpoint = 'http://localhost:8080/';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {

    constructor(private http: HttpClient) { }

    private extractData(res: Response) {
        let body = res;
        return body || {};
    }

    getTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(endpoint + 'task').pipe(
          	map(data => data.map(data => new Task().deserialize(data))) 
	    );
    }
    
    getTaskById(id: string): Observable<Task> {
    	return this.http.get<Task>(endpoint + 'task');    
	}
    
    createTask(task: Task): Observable<Task> {
    	console.log("Create task:" + task);
    	return this.http.post<Task>(endpoint + 'task', task, httpOptions)
		    .pipe(
		      catchError(this.handleError('Create task ', task))
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

