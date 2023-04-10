import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MaritalStatusService {

  private baseUrl = 'http://localhost:5131/api/v1/MaritalStatus';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl +'/GetAllAsync');
  }


}
