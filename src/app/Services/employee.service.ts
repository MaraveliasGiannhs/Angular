import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../Models/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http : HttpClient) { }

    private url = "http://localhost:5178/api/employee" //backend url


    getAll(): Observable<Employee[]>{
      return this.http.get<Employee[]>(this.url)
    }

    get(id: string): Observable<Employee>{
      return this.http.get<Employee>(`${this.url}/${id}`)
    }

    create(name: string, date: string): Observable<Employee>{
      return this.http.post<Employee>(this.url, {name})
    }

    update(id: string, name: string, finishedWorkAt: string):Observable<Employee>{
      return this.http.put<Employee>(`${this.url}/${id}`,{name, finishedWorkAt}) //{put here model's fields to pass to backend}
    }

    delete(id: string): Observable<void>{
      return this.http.delete<void>(`${this.url}/${id}`)
    }
}
