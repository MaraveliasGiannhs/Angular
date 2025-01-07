import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { employee } from '../Models/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http : HttpClient) { }

    private url = "http://localhost:5178/api/employee" //backend url


    getAll(): Observable<employee[]>{
      return this.http.get<employee[]>(this.url)
    }

    get(id: string): Observable<employee>{
      return this.http.get<employee>(`${this.url}/${id}`)
    }

    create(name: string, date: string): Observable<employee>{
      return this.http.post<employee>(this.url, {name})
    }

    update(id: string, name: string, finishedWorkAt: string):Observable<employee>{
      return this.http.put<employee>(`${this.url}/${id}`,{name, finishedWorkAt}) //{put here model's fields to pass to backend}
    }

    delete(id: string): Observable<void>{
      return this.http.delete<void>(`${this.url}/${id}`)
    }
}
