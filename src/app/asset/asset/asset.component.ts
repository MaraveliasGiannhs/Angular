import { AssetType } from './../../Models/asset-type';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { Component, OnInit } from '@angular/core';
import { Asset } from '../../Models/asset';
import { HttpClient } from '@angular/common/http';
import { AssetService } from '../../Services/asset.service';

import { AssetTypeService } from '../../Services/asset-type.service';
import { AssetTypeComponent } from './../../asset-type/asset-type.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-asset',
  standalone: false,

  templateUrl: './asset.component.html',
  styleUrl: './asset.component.css'
})
export class AssetComponent implements OnInit{

  constructor(private service: AssetService, private assetTypeService: AssetTypeService, private http: HttpClient){}

  assetType: AssetType[] =[]

  asset: Asset[] = []
  canCreateNewAsset: boolean = false
  listHidden: boolean = false
  searchTerm: string = ''
  searchInvalid: boolean = false
  editing: boolean = false

  ngOnInit(): void {

    this.assetTypeService.getAll().subscribe(
      (data:AssetType[]) => {
        this.assetType = data;
      },
      (errorContext) => {
        console.log("Error occured while trying to fetch Asset Types", errorContext);
      }
    )
  }

  toggleList(){

    this.searchInvalid = false;

    this.service.getAll().subscribe(
      (data: Asset[]) => {
        this.asset = data;
        this.listHidden = !this.listHidden;
      },
      (errorContext) => {
        console.error("Error occured while trying to display list", errorContext)
      }
    );
  }

  createNewAsset( ){
    this.canCreateNewAsset = true;
  }

  submitNewAsset(name: string, assetTypeId : string){

    this.service.create(name, assetTypeId).subscribe(
      (response) =>{
        console.log("Asset created successfully.")
        this.asset.push(response);
      },
      (errorContext) =>{
        console.log("Error occured while trying to create a new Asset", errorContext);
      }
    )
  }

  searchAssetById(id: string){
    if (!id || id.trim().length === 0) {
      console.error("Invalid ID: ID is empty or contains only spaces.");
      this.asset = [];
      this.searchInvalid = true;
      return; // Exit early if the ID is invalid
    }
  }
  updateAsset(id: string, asset: Asset){
    asset.editing = !asset.editing
  }

  saveAsset(asset: Asset){
    this.service.update(asset.id, asset.name, asset.assetTypeId ).subscribe(
      (response) =>{
      console.log("Asset Type Updated Successfully")
      },
      (errorContext)=>{
        console.log("Error occured while trying to update an Asset Type", errorContext)
      });

      asset.editing = false
  }

  cancelUpdateAssetType(asset : AssetType){
    asset.editing = false;
  }

  deleteAsset(id: string){
    this.asset = this.asset.filter(a => a.id !== id)

    this.service.delete(id).subscribe(
      (Response) =>{
        console.log("Asset deleted successfully")
      },
      (errorContext) =>{
        console.log("Error occured while trying to delete Asset" , errorContext)
      })
  }



}
