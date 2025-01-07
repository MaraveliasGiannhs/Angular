import { Injectable } from '@angular/core';
import { Branch } from '../Models/branch';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private http: HttpClient) { } //if not private error?

  private url = "http://localhost:5178/api/branches" 

    getAll(): Observable<Branch[]>{
      return this.http.get<Branch[]>(this.url)
    }
  
    get(id: string): Observable<Branch>{
      return this.http.get<Branch>(`${this.url}/${id}`)
    }
  
    create(name: string, assetTypeId : string): Observable<Branch>{
      return this.http.post<Branch>(this.url, {name, assetTypeId})
    }
  
    update(id: string, name: string, assetTypeId: string):Observable<Branch>{
      return this.http.put<Branch>(`${this.url}/${id}`,{assetTypeId, name}) //{put here model's fields to pass to backend}
    }
  
    delete(id: string): Observable<void>{
      return this.http.delete<void>(`${this.url}/${id}`)
    }
}
