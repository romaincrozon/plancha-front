import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { Profile } from '../../models/profile.model';

const endpoint = 'http://localhost:8080/';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
	
	constructor(private http: HttpClient) { }

    private extractData(res: Response) {
        let body = res;
        return body || {};
    }

    getProfiles(): Observable<Profile[]> {
        return this.http.get<Profile[]>(endpoint + 'profile')
	        .pipe(
	          	map(data => data.map(data => new Profile().deserialize(data))) 
		    );
    }
    
	createProfile(profile: Profile): Observable<Profile> {
    	console.log("Create profile :" + profile);
    	return this.http.post<Profile>(endpoint + 'profile', profile, httpOptions)
		    .pipe(
		      catchError(this.handleError('Create profile ', profile))
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
