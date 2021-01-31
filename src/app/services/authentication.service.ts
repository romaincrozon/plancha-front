import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
 
import { Resource } from '../models/resource.model';

const endpoint = 'http://localhost:8080/';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private currentResourceSubject: BehaviorSubject<Resource>;
    public currentResource: Observable<Resource>;

    constructor(private http: HttpClient) {
        this.currentResourceSubject = new BehaviorSubject<Resource>(JSON.parse(localStorage.getItem('currentResource')));
        this.currentResource = this.currentResourceSubject.asObservable();
    }

    public get currentResourceValue(): Resource {
        return this.currentResourceSubject.value;
    }

    login(username, password) {
        return this.http.post<any>(endpoint + "login", { username, password })
            .pipe(map(resource => {
                localStorage.setItem('currentResource', JSON.stringify(resource));
                this.currentResourceSubject.next(resource);
                console.log(resource);
                return resource;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentResource');
        this.currentResourceSubject.next(null);
    }
}