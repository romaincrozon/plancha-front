import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { Competence } from '../../models/competence.model';

const endpoint = 'http://localhost:8080/';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
  providedIn: 'root'
})
export class CompetenceService {

  	constructor(private http: HttpClient) { }

    private extractData(res: Response) {
        let body = res;
        return body || {};
    }

    getCompetences(): Observable<Competence[]> {
        return this.http.get<Competence[]>(endpoint + 'competence')
	        .pipe(
	          	map(data => data.map(data => new Competence().deserialize(data))) 
		    );
    }
       
    createCompetence(competence: Competence): Observable<Competence> {
    	console.log("Create competence:" + competence);
    	return this.http.post<any>(endpoint + 'competence', competence, httpOptions)
		    .pipe(
		      catchError(this.handleError('Create competence ', competence))
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
