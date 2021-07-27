import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { TodoCategory } from '../models/todo-category.model';

const endpoint = 'http://localhost:8080/';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
  providedIn: 'root'
})
export class TodoCategoryService {

	constructor(private http: HttpClient) { }

    private extractData(res: Response) {
        let body = res;
        return body || {};
    }

    getTodoCategories(): Observable<TodoCategory[]> {
        return this.http.get<TodoCategory[]>(endpoint + 'todoCategory').pipe(
          	map(data => data.map(data => new TodoCategory().deserialize(data))) 
	    );
    }
    
    getTodoCategoryById(id: string): Observable<TodoCategory> {
    	return this.http.get<TodoCategory>(endpoint + 'todoCategory/' + id);    
	}
	
    creatTodoCategory(todoCategory: TodoCategory): Observable<TodoCategory> {
    	return this.http.post<TodoCategory>(endpoint + 'todoCategory', todoCategory, httpOptions)
		    .pipe(
		      catchError(this.handleError('Create todoCategory ', todoCategory))
		    );
    }
    
    updateTodoCategory(todoCategory: TodoCategory): Observable<TodoCategory> {
    	console.log("Update todoCategory :" + todoCategory);
    	return this.http.put<TodoCategory>(endpoint + 'todoCategory', todoCategory, httpOptions)
		    .pipe(
		      catchError(this.handleError('Update todoCategory ', todoCategory))
		    );
    }
    
    delete(todoCategory: TodoCategory): void {
    	console.log("Delete todoCategory:" + todoCategory);
    	this.http.delete(endpoint + 'todoCategory/' + todoCategory.id).subscribe(() => console.log('Delete successful'));
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