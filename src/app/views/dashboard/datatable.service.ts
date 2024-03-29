import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface UserData {
    iduser: string;
    startin: string;
    endin: string;
    pictstart: string;
    pictend: string;
}

export interface TableData extends Array<UserData> { }

@Injectable()
export class DataTableService {
    dataUrl = 'assets/data.json';
    apiUrl = 'http://66.42.57.140:14045/check/dashboard';
    constructor(private http: HttpClient) { }

    getData() {
        return this.http.get<TableData>(this.apiUrl)
            .pipe(
                retry(3), // retry a failed request up to 3 times
                catchError(this.handleError) // then handle the error
            );
    }

    getDataStatus() {
        return this.http.get(this.apiUrl)
            .pipe(
                retry(3), // retry a failed request up to 3 times
                catchError(this.handleError) // then handle the error
            );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    }
}
