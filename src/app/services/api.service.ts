/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { retry, catchError, tap  } from 'rxjs/operators';

import { Materials } from '../models/materials';
import { Orders } from '../models/orders';
import { Users } from '../models/users';
import { Categories } from '../models/categories';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  base_path = 'http://localhost:3000/';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };

/*
  getOrders(): Observable<Orders> {
    return this.httpClient.get<Orders>(this.base_path+ 'orders')
      .pipe(
        tap(users => console.log('Users retrieved!')),
        catchError(this.handleError)
      );
  } */

  public getOrders(): Observable<Orders> {
    return this.httpClient.get<Orders>(this.base_path + 'orders/').pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  public getOrderById(id): Observable<Orders> {
    return this.httpClient.get<Orders>(this.base_path + 'orders/' + id).pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  public createOrder(data): Observable<Orders> {
    return this.httpClient.post<Orders>(this.base_path + 'orders/', JSON.stringify(data), this.httpOptions).pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  public updateOrder(id, data): Observable<Orders> {
    return this.httpClient.put<Orders>(this.base_path + 'orders/' + id, JSON.stringify(data), this.httpOptions).pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  public deleteOrder(id) {
    return this.httpClient.delete<Orders>(this.base_path + '/' + id, this.httpOptions).pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  //user

  public getUsers(): Observable<Users> {
    return this.httpClient.get<Users>(this.base_path + 'users/').pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  getUserById(id): Observable<Users> {
    return this.httpClient.get<Users>(this.base_path + 'users/' + id).pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  //category

  public getCategories(): Observable<Categories> {
    return this.httpClient.get<Categories>(this.base_path + 'categories/').pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  getCategoryById(id): Observable<Categories> {
    return this.httpClient.get<Categories>(this.base_path + 'categories/' + id).pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  //materials

  public getMaterials(): Observable<Materials> {
    return this.httpClient.get<Materials>(this.base_path + 'materials/').pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

}
