import { Asset } from './../Models/asset';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs'
import { AssetType } from '../Models/asset-type';
import { AssetLookup } from '../lookup-classes/asset-lookup';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(private http : HttpClient) { }

  private url = "http://localhost:5178/api/assets" //backend url


  getAll(): Observable<Asset[]>{
    return this.http.get<Asset[]>(this.url)
  }

  get(id: string): Observable<Asset>{
    return this.http.get<Asset>(`${this.url}/${id}`)
  }

  create(name: string, assetTypeId:string): Observable<Asset>{
    return this.http.post<Asset>(this.url, {name, assetTypeId})
  }

  update(id: string, name: string, assetTypeId: string):Observable<Asset>{
    return this.http.post<Asset>(this.url,{id, name, assetTypeId}) //{put here model's fields to pass to backend}
  }

  delete(id: string): Observable<void>{
    return this.http.delete<void>(`${this.url}/${id}`)
  }
  search(lookup : AssetLookup): Observable<Asset[]>{
    return this.http.post<Asset[]>(`${this.url}/search`, lookup)
  }
}
