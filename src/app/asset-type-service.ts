import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs';

import { AssetTypeModel } from './asset-type-model';
import {v4 as uuid} from 'uuid';



@Injectable({ providedIn: 'root' })

export class AssetTypeServiceComponent {

  private assetTypeUrl = "https://localhost:7071/api/assetTypes/assetType" 

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {}

  createAssetType(assetType : AssetTypeModel): Observable<AssetTypeModel>{
    return this.http.post<AssetTypeModel>(this.assetTypeUrl, assetType, this.httpOptions);
  }

  getAssetType(id: string): Observable<AssetTypeModel>{
    const url = '${this.assetTypeUrl}/${id}';
    return this.http.get<AssetTypeModel>(url)
  }

  getAllAssetType(): Observable<AssetTypeModel>{
    return this.http.get<AssetTypeModel>(this.assetTypeUrl)
  }

  updateAssetType(assetType : AssetTypeModel): Observable<AssetTypeModel>{
    return this.http.put<AssetTypeModel>(this.assetTypeUrl,assetType, this.httpOptions)
  }

  deleteAssetType(id: string): Observable<AssetTypeModel>{
    const url = '${this.assetTypeUrl}/${id}';
    return this.http.delete<AssetTypeModel>(url, this.httpOptions);
  }

}
