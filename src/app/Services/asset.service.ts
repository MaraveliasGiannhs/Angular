import { Asset } from './../Models/asset';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs'
import { AssetLookup } from '../lookup-classes/asset-lookup';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(private http : HttpClient) { }
  private url = "http://localhost:5178/api/assets" //backend url



  get(id : string): Observable<Asset[]>{
    return this.http.get<Asset[]>(`${this.url}/${id}`) 
  }

  update(asset : Asset):Observable<Asset>{ //post/put
    return this.http.post<Asset>(this.url,asset) 
  }

  delete(id: string): Observable<void>{
    return this.http.delete<void>(`${this.url}/${id}`)
  }
  
  search(lookup : AssetLookup): Observable<Asset[]>{ //+getAll
    return this.http.post<Asset[]>(`${this.url}/search`, lookup)
  }


  

}
