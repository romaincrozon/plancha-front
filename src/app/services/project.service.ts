import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { Project } from '../models/project.model';
import { CalendarRange } from '../models/calendar-range.model';

const endpoint = 'http://localhost:8080/';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
      let body = res;
      return body || {};
  }

  getProjectsWithNoParent(): Observable<Project[]> {
    return this.http.get<Project[]>(endpoint + 'project')
      .pipe(
          map(data => data.map(data => new Project().deserialize(data))) 
    );
  }

  getAllProjects(): Observable<any> {
    return this.http.get<Project[]>(endpoint + 'project/all')
      .pipe(
          map(data => data.map(data => new Project().deserialize(data))) 
    );
  }

    getProjectById(id: string): Observable<Project> {
    	return this.http.get<Project>(endpoint + 'project/' + id);    
	}
    
    createProject(project: Project): Observable<Project> {
    	console.log("Create project :" + project);
    	return this.http.post<Project>(endpoint + 'project', project, httpOptions)
		    .pipe(
		      catchError(this.handleError('Create project ', project))
		    );
    }
    
    getProjectsByDate(calendarRange: CalendarRange): Observable<any> {
	    return this.http.post<any>(endpoint + 'projectsByDate', calendarRange, httpOptions)
		    .pipe(
		      catchError(this.handleError('Get projects for range', calendarRange))
		    );
    }
    
    updateProject(project: Project): Observable<Project> {
    	console.log("Update project :" + project);
    	return this.http.put<Project>(endpoint + 'project', project, httpOptions)
		    .pipe(
		      catchError(this.handleError('Update project ', project))
		    );
    }
    
    addResourceToProject(projectId, resource){
    	console.log("Add resource " + resource + " to project :" + projectId);
    	return this.http.post<Project>(endpoint + 'project/' + projectId + '/resource', resource, httpOptions)
		    .pipe(
		      catchError(this.handleError('Update project ', projectId))
		    );
    }
    
    delete(project: Project): void {
    	console.log("Delete project :" + project);
    	this.http.delete(endpoint + 'project/' + project.id).subscribe(() => console.log('Delete successful'));
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
