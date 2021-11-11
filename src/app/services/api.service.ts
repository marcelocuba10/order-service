/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';

import { Materials } from '../models/materials';
import { Orders } from '../models/orders';
import { Users } from '../models/users';
import { Categories } from '../models/categories';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  base_path = 'http://localhost:8000/api';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        'Backend returned code ${error.status}, ' +
        'body was: ${error.error}');
    }
    return throwError(
      'Something bad happened; please try again later.');
  };

  //orders

  public getOrders(): Observable<Orders[]> {
    return this.http.get < Orders[] > (this.base_path + '/orders/');
  }

  public addOrder(order: Orders): Observable<Orders> {
    return this.http.post < Orders > (this.base_path + '/orders/', order);
  }

  public updateOrder(orderId: number, order: Orders): Observable<Orders> {
    return this.http.put < Orders > (this.base_path + '/orders/' + orderId, order);
  }

  public deleteOrder(orderId: number): Observable<Orders> {
    return this.http.delete < Orders > (this.base_path + '/orders/' + orderId);
  }


  //user
  public getUsers(): Observable<Users> {
    return this.http.get < Users > (this.base_path + 'users/').pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  getUserById(id): Observable<Users> {
    return this.http.get < Users > (this.base_path + 'users/' + id).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  //category

  public getCategories(): Observable<Categories[]> {
    return this.http.get < Categories[] > (this.base_path + '/categories/');
  }

  getCategoryById(id): Observable<Categories> {
    return this.http.get < Categories > (this.base_path + '/categories/' + id);
  }

  //materials

  public getMaterials(): Observable<Materials> {
    return this.http.get < Materials > (this.base_path + 'materials/').pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  public getMaterialById(id): Observable<Materials> {
    return this.http.get < Materials > (this.base_path + 'materials/' + id).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  public createMaterial(data): Observable<Materials> {
    return this.http.post < Materials > (this.base_path + 'materials', JSON.stringify(data), this.httpOptions).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  public updateMaterial(id, data): Observable<Materials> {
    return this.http.put < Materials > (this.base_path + 'materials/' + id, JSON.stringify(data), this.httpOptions).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

}
