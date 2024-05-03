import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl: string;
  private Url: string;
  clave: string = 'nJ9Pv2bTEBq`eQ6Fw_YjKg';
  constructor(private http: HttpClient) {

    this.myAppUrl = environment.endPoint;
    this.Url = 'api/users'
  }

  signIn(user: User): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.Url}`, user)

  }

  login(user: User): Observable<string> {
    
    return this.http.post<string>(`${this.myAppUrl}${this.Url}/login`, user)


  }
}
