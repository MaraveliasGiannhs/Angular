import { AssetType } from './../Models/asset-type';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssetTypeLookup } from '../lookup-classes/asset-type-lookup';

@Injectable({
  providedIn: 'root'
})
export class AssetTypeService {

  constructor(private http: HttpClient) { }


  private url = "http://localhost:5178/api/assetTypes" //backend url


  getAll(): Observable<AssetType[]> {
    return this.http.get<AssetType[]>(this.url)
  }

  get(id: string): Observable<AssetType> {
    return this.http.get<AssetType>(`${this.url}/${id}`)
  }

  update(asset: AssetType): Observable<AssetType> {
    return this.http.post<AssetType>(this.url, asset) //{put here model's fields to pass to backend}
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`)
  }

  search(lookup: AssetTypeLookup): Observable<AssetType[]> {
    return this.http.post<AssetType[]>(`${this.url}/search`, lookup)
  }

  // for Content-type / Authorization settings
  //
  // private getHttpOptions() {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json', // Setting content-type as application/json
  //     // Example: 'Authorization': 'Bearer <your-token>'
  //   });
  //   return { headers };
  // }
}
