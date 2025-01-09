import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Company } from '../Models/company';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http : HttpClient) { }

  private url = "http://localhost:5178/api/companies" //backend url


  getAll(): Observable<Company[]>{
    return this.http.get<Company[]>(this.url)
  }

  get(id: string): Observable<Company>{
    return this.http.get<Company>(`${this.url}/${id}`)
  }

  create(name: string): Observable<Company>{
    return this.http.post<Company>(this.url, {name})
  }

  update(id: string, name: string):Observable<Company>{
    return this.http.put<Company>(`${this.url}/${id}`,{name}) //{put here model's fields to pass to backend}
  }

  delete(id: string): Observable<void>{
    return this.http.delete<void>(`${this.url}/${id}`)
  }
}
