import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {  
  private myAppUrl: string;
  private url: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endPoint;
    this.url = 'api/productos/'
  }

  getListProducts(): Observable<product[]>{
    return this.http.get<product[]>(`${this.myAppUrl}${this.url}`);

  }

  deleteProduct(id:number): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.url}${id}`)
  }


  saveProduct(Product: product): Observable<void>{

     return this.http.post<void>(`${this.myAppUrl}${this.url}`,Product)
  }
}
