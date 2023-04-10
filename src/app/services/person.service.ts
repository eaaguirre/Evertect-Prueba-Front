import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { PersonData } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private baseUrl = 'http://localhost:5131/api/v1/Employee/';



  constructor(private http: HttpClient) { }

  getAll(page:number,rows:number): Observable<PersonData[]> {
    return this.http.get<PersonData[]>(`${this.baseUrl}` +  'GetPaginatedEmployee/'+ `${page}/${rows}`);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'InsertAsync', data);
  }

  update(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}` + 'UpdateAsync', data);
  }

  delete(data: any): Observable<any> {

    const options = {
      headers:  new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data
    };
    return this.http.delete(`${this.baseUrl}` + 'DeleteAsync',options);
  }
}
