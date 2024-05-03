import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  searchProductByName(searchTerm: any) {
    throw new Error('Method not implemented.');
  }  
  private myAppUrl: string;
  private url: string;
  token:any;
  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endPoint;
    this.url = 'api/productos/';
  }

  getListProducts(): Observable<product[]>{
    this.token= localStorage.getItem('token');
    var headers = new HttpHeaders().set('authorization', `Bearer ${this.token}`);
    return this.http.get<product[]>(`${this.myAppUrl}${this.url}`,{headers:headers});

  }

  deleteProduct(id:number): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.url}${id}`)
  }


  saveProduct(Product: product): Observable<void>{

     return this.http.post<void>(`${this.myAppUrl}${this.url}`,Product)
  }

  getproduct(id: number): Observable<product>{
    return this.http.get<product>(`${this.myAppUrl}${this.url}${id}`)
  }

  updateProduct(id: number, product: product): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.url}${id}`, product);
  }

  getToken(){
    
  }

 
}
