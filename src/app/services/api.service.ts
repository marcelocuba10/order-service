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

  //API_URL = 'https://orderservice.hakecode.com/api/';
  API_URL = 'http://127.0.0.1:8000/api/';

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods':'POST, GET, PUT, OPTIONS, DELETE, PATCH',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With', 
    })
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

  //test

  // getOrders(): Observable<Orders[]> {
  //   return this.http.get<Orders>(this.API_URL + 'orders/', this.headers)
  //     .pipe(
  //       tap(Student => console.log('Student fetched!')),
  //       catchError(this.handleError<Orders>('Get student', []))
  //     );
  // }

  //orders

  public getOrders(): Observable<Orders[]> {
    return this.http.get < Orders[] > (this.API_URL + 'orders/',this.httpHeader);
  }

  public addOrder(order: Orders): Observable<Orders> {
    return this.http.post < Orders > (this.API_URL + 'orders/', order,this.httpHeader);
  }

  public updateOrder(orderId: number, order: Orders): Observable<Orders> {
    return this.http.put < Orders > (this.API_URL + 'orders/' + orderId, order,this.httpHeader);
  }

  public deleteOrder(orderId: number): Observable<Orders> {
    return this.http.delete < Orders > (this.API_URL + 'orders/' + orderId,this.httpHeader);
  }

  //category

  public getCategories(): Observable<Categories[]> {
    return this.http.get < Categories[] > (this.API_URL + 'categories/',this.httpHeader);
  }

  getCategoryById(id): Observable<Categories> {
    return this.http.get < Categories > (this.API_URL + 'categories/' + id,this.httpHeader);
  }

  //materials

  public getMaterials(): Observable<Materials[]> {
    return this.http.get < Materials[] > (this.API_URL + 'materials/',this.httpHeader);
  }

  public getMaterialById(id): Observable<Materials> {
    return this.http.get < Materials > (this.API_URL + 'materials/' + id,this.httpHeader);
  }

  public createMaterial(material: Materials): Observable<Materials> {
    return this.http.post < Materials > (this.API_URL + 'materials/', material,this.httpHeader);
  }

  public updateMaterial(materialId: number, material: Materials): Observable<Materials> {
    return this.http.put < Materials > (this.API_URL + 'materials/' + materialId, material,this.httpHeader);
  }

  public deleteMaterial(materialId: number): Observable<Materials> {
    return this.http.delete < Materials > (this.API_URL + 'materials/' + materialId,this.httpHeader);
  }

  //user
  public getUsers(): Observable<Users> {
    return this.http.get < Users > (this.API_URL + 'users/',this.httpHeader).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  getUserById(id): Observable<Users> {
    return this.http.get < Users > (this.API_URL + 'users/' + id,this.httpHeader).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

}