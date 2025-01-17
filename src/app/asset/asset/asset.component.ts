import { AssetType } from './../../Models/asset-type';
import { Component, OnInit } from '@angular/core';
import { Asset } from '../../Models/asset';
import { AssetService } from '../../Services/asset.service';

import { AssetTypeService } from '../../Services/asset-type.service';
import { AssetLookup } from '../../lookup-classes/asset-lookup';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';




@Component({
  selector: 'app-asset',
  standalone: false,

  templateUrl: './asset.component.html',
  styleUrl: './asset.component.css'
})
export class AssetComponent implements OnInit {

  constructor(private service: AssetService, private assetTypeService: AssetTypeService,  private cdRef: ChangeDetectorRef) { }

  assetType: AssetType[] = []
  assetLookup: AssetLookup = { id: undefined, like: ''}

  asset: Asset[] = []
  canCreateNewAsset: boolean = false
  listHidden: boolean = false
  searchTerm: string = ''
  searchInvalid: boolean = false
  editing: boolean = false

  formModel: FormGroup<any>  = new FormGroup({})

  ngOnInit(): void {
    this.assetTypeService.getAll().subscribe(
      (data: AssetType[]) => {
        this.assetType = data;
      },
      (errorContext) => {
        console.log("Error occured while trying to fetch Asset Types", errorContext);
      })
  }



  toggleList() {    
    this.searchInvalid = false;
    
    this.service.search(this.assetLookup).subscribe(
      (data: Asset[]) => {
        this.asset = data;
        this.listHidden = !this.listHidden;
      },
      (errorContext) => {
        console.error("Error occured while trying to display list", errorContext)
      }
    );
    this.canCreateNewAsset = false
  }



  private buildForm(data: Asset | null) {
    this.formModel = new FormGroup({
      id: new FormControl(data?.id),
      name: new FormControl(data?.name, Validators.required), //bind value from param object to control value
      assetTypeId: new FormControl(data?.assetType?.id),
    })
  }



  createNewAsset() {
    this.buildForm(null)
    this.canCreateNewAsset = !this.canCreateNewAsset;
    this.listHidden = false
  }



  submitNewAsset() {
    const asset = this.formModel?.value! 
    //this.buildForm(asset)

    // if (asset.assetTypeId){
    //   asset.assetType = {
    //     id: asset.assetTypeId,
    //    }
    // }

    this.service.update(asset).subscribe(
      (response: Asset[]) => {
        console.log("Asset created successfully.")
        //this.asset.push(response); this?
        this.asset=response //or this?
      },
      (errorContext) => {
        console.log("Error occured while trying to create a new Asset", errorContext);
      }
    )
  }



  searchAssetById(id: string) {
    if (!id || id.trim().length === 0) {
      console.error("Invalid ID: ID is empty or contains only spaces.");
      this.asset = [];
      this.searchInvalid = true;
      return; // exit early if the ID is invalid
    }
  }



  updateAsset(asset: Asset) {
    asset.editing = !asset.editing
    this.canCreateNewAsset = false
    this.buildForm(asset)

    this.service.get(asset.id).subscribe(
      (data: Asset[]) => {
        console.log("Updating Asset ...", data)
        this.buildForm(asset)
      },
      (errorContext: any) => {
        console.log("Error occured while trying to fetch Asset for update", errorContext)
      }
    )

    this.asset.forEach((a: any) => { //make all assets in list not editable
      a.editing = false;
    });
    asset.editing = !asset.editing //except for the last asset that was attempted to edit
  }



  saveAsset() {  
    const asset: Asset = this.formModel?.value!
    console.log(asset.id, asset.name)
    this.buildForm(asset);

    this.service.update(asset).subscribe(
      (response: Asset[]) => {
        //this.asset = response
        //this.asset.push(response);
        console.log("Asset Updated Successfully")
      },
      (errorContext) => {
        console.log("Error occured while trying to update an Asset", errorContext)
      });

    this.buildForm(asset);

    //Fix this
    this.toggleList();
    this.toggleList();
    this.toggleList();
    this.toggleList();
    this.toggleList();
    this.toggleList();
  }



  cancelUpdateAsset(asset: Asset) {
    asset.editing = false;
  }



  deleteAsset(id: string) {
    this.asset = this.asset.filter(a => a.id !== id)
    this.service.delete(id).subscribe(
      (response) => {
        console.log("Asset deleted successfully", response)
      },
      (errorContext) => {
        console.log("Error occured while trying to delete Asset", errorContext)
      })
  }



  searchAssetDynamically() {

    if (!this.assetLookup.id || this.assetLookup.id.trim() === '')
      this.assetLookup.id = undefined

    this.service.search(this.assetLookup).subscribe(
      (response: Asset[]) => {
        console.log("Search results for Asset Types updated.")
        this.asset = response;
      },
      (errorContext) => {
        console.log("Error occured while searching Asset Type.", errorContext)
      }
    )
  }




}
