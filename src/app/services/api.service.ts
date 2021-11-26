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

  API_URL = 'http://localhost:8000/api/';
  //API_URL = 'https://orderservice.hakecode.com/api';

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Accept': 'application/json, text/plain'
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

  //orders

  public getOrders(): Observable<Orders[]> {
    return this.http.get < Orders[] > (this.API_URL + 'orders/');
  }

  public addOrder(order: Orders): Observable<Orders> {
    return this.http.post < Orders > (this.API_URL + 'orders/', order);
  }

  public updateOrder(orderId: number, order: Orders): Observable<Orders> {
    return this.http.put < Orders > (this.API_URL + 'orders/' + orderId, order);
  }

  public deleteOrder(orderId: number): Observable<Orders> {
    return this.http.delete < Orders > (this.API_URL + 'orders/' + orderId);
  }

  //category

  public getCategories(): Observable<Categories[]> {
    return this.http.get < Categories[] > (this.API_URL + 'categories/');
  }

  getCategoryById(id): Observable<Categories> {
    return this.http.get < Categories > (this.API_URL + 'categories/' + id);
  }

  //materials

  public getMaterials(): Observable<Materials[]> {
    return this.http.get < Materials[] > (this.API_URL + 'materials/');
  }

  public getMaterialById(id): Observable<Materials> {
    return this.http.get < Materials > (this.API_URL + 'materials/' + id);
  }

  public createMaterial(material: Materials): Observable<Materials> {
    return this.http.post < Materials > (this.API_URL + 'materials/', material);
  }

  public updateMaterial(materialId: number, material: Materials): Observable<Materials> {
    return this.http.put < Materials > (this.API_URL + 'materials/' + materialId, material);
  }

  public deleteMaterial(materialId: number): Observable<Materials> {
    return this.http.delete < Materials > (this.API_URL + 'materials/' + materialId);
  }

  //user
  public getUsers(): Observable<Users> {
    return this.http.get < Users > (this.API_URL + 'users/').pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  getUserById(id): Observable<Users> {
    return this.http.get < Users > (this.API_URL + 'users/' + id).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

}