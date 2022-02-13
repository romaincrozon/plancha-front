import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { Todo } from '../models/todo.model';

const endpoint = 'http://localhost:8080/';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  	constructor(private http: HttpClient) { }

    private extractData(res: Response) {
        let body = res;
        return body || {};
    }

    getTodoItems(): Observable<Todo[]> {
	    return this.http.get<Todo[]>(endpoint + 'todo')
	        .pipe(
	          	map(data => data.map(data => new Todo().deserialize(data))) 
		    );
    }
    
    getTodoItemsByResource(idResource: string): Observable<Todo[]> {
        return this.http.get<Todo[]>(endpoint + 'todo/resource/' + idResource)
	        .pipe(
	          	map(data => data.map(data => new Todo().deserialize(data))) 
		    );
    }

    createTodo(todo: Todo): Observable<Todo> {
    	console.log("Create Todo:" + todo);
    	return this.http.post<Todo>(endpoint + 'todo', todo, httpOptions)
		    .pipe(
		      catchError(this.handleError('Create todo ', todo))
		    );
    } 
       
    updateTodoItem(todo: Todo): Observable<Todo> {
    	console.log("Update todo:" + todo);
    	return this.http.put<Todo>(endpoint + 'todo/' + todo.id, todo, httpOptions)
		    .pipe(
		      catchError(this.handleError('Update todo ', todo))
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
