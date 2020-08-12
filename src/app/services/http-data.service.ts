import { Contact } from './../models/contact';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class HttpDataService {

  base_path = 'http://localhost:3000/rows';
  contact: any;

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.error('Ha ocurrido un error: ', error.error.message);
    }else{
      console.error(
        `Backend returned code ${error.status}, ` +
        `Body was: ${error.error}`);
    }
    return throwError(
      'Ha ocurrido un error; intentar nuevamente más tarde. '
    );
  }

  createContact(item):Observable<Contact>{
    return this.http
      .post<Contact>(this.base_path, item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getContact(id): Observable<Contact> {
    return this.http
      .get<Contact>(this.base_path + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getContacts():Observable<Contact> {
    return this.http
      .get<Contact>(this.base_path)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updateContact(contact):Observable<Contact>{
    return this.http
      .put<Contact>(this.base_path + '/' + contact.id, contact)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  deleteContact(contact){
    return this.http
      .delete<Contact>(this.base_path + '/' + contact.id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

}
