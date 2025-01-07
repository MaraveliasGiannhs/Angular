import { AssetType } from './../Models/asset-type';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { AssetTypeService } from './../Services/asset-type.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgTemplateOutlet } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asset-type',
  standalone: false,

  templateUrl: './asset-type.component.html',
  styleUrl: './asset-type.component.css'
})



export class AssetTypeComponent {



  constructor( private service :AssetTypeService){}

  assetType : AssetType[] = [];
  listHidden : boolean = false;
  canCreateNewAssetType : boolean = false;
  editing: boolean = false;
  searchTerm: string = '';  // hold the search value
  searchInvalid: boolean = false;



  toggleList(){

    this.searchInvalid = false;

    this.service.getAll().subscribe(
      (data: AssetType[]) => {
        this.assetType = data;
        this.listHidden = !this.listHidden;
      },
      (errorContext) => {
        console.error("Error occured while trying to display list", errorContext)
      }
    );
  }

  createNewAssetType(){
    this.canCreateNewAssetType = !this.canCreateNewAssetType
  }

  submitNewAssetType(name: string){
    this.service.create(name).subscribe(
      (response) =>{ // response is returned by the service and then its used
      console.log("Asset Type Created Successfully")
      this.assetType.push(response);

      },
      (errorContext)=>{
        console.log("Error occured while trying to create a new Asset Type")
      });
    }

    deleteAssetType(id:string){

      this.assetType = this.assetType.filter(asset => asset.id !== id); //delete (filtrer out) element from assetType list

      this.service.delete(id).subscribe(
        (response) =>{
        console.log("Asset Type Deleted Successfully")
        },
        (errorContext)=>{
          console.log("Error occured while trying to delete a new Asset Type")
        });
    }

    updateAssetType(id: string, asset:AssetType){
      asset.editing = !asset.editing;
    }

    cancelUpdateAssetType(asset : AssetType){
      asset.editing = false;
    }

    saveAssetType(asset: AssetType){
      this.service.update(asset.id, asset.name ).subscribe(
        (response) =>{
        console.log("Asset Type Updated Successfully")
        },
        (errorContext)=>{
          console.log("Error occured while trying to update an Asset Type")
        });

        asset.editing = false
    }

    searchAssetTypeByName(id: string){

      this.service.get(id).subscribe(
        (response) =>{
        console.log(`Asset Type with id: ${id} found.`)
        this.assetType = this.assetType.filter(asset => asset.id === id && asset.id != null); //???
        this.searchInvalid = false;
        },
        (errorContext)=>{
          this.assetType = []
          console.log("Error occured while trying to find an Asset Type")
          this.searchInvalid = true;
        });

        console.log(this.searchInvalid)
    }



}
