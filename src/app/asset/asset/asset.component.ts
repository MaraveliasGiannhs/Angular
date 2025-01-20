import { AssetType } from './../../Models/asset-type';
import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private service: AssetService, private assetTypeService: AssetTypeService) { }

  assetType: AssetType[] = []
  assetLookup: AssetLookup = { id: undefined, like: ''}

  asset: Asset[] = []
  canCreateNewAsset: boolean = false
  listHidden: boolean = false
  searchTerm: string = ''
  searchInvalid: boolean = false
  formModel: FormGroup<any>  = new FormGroup({})

 
  ngOnInit(): void {
    this.assetTypeService.search(this.assetLookup).subscribe(
      (data: AssetType[]) => {
        this.assetType = data;
      },
      (errorContext) => {
        console.log("Error occured while trying to fetch Asset Types", errorContext);
      })
  }



  initList() {    
    this.service.search(this.assetLookup).subscribe(
      (data: Asset[]) => {
        this.asset = data;
        this.listHidden = !this.listHidden;
      },
      (errorContext) => {
        console.error("Error occured while trying to display list", errorContext)
      }
    );
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

    this.service.update(asset).subscribe(
      (response: Asset) => {
        console.log("Asset created successfully.")
        this.asset.push(response) //this?
        //this.asset=response //or this?
      },
      (errorContext) => {
        console.log("Error occured while trying to create a new Asset", errorContext);
      }
    )
  }



  updateAsset(asset: Asset) {
    this.canCreateNewAsset = false
    this.buildForm(asset)

    this.service.get(asset.id).subscribe(
      (data: Asset[]) => {
        console.log("Updating Asset ...", data)
        //this.buildForm(asset)
      },
      (errorContext: any) => {
        console.log("Error occured while trying to fetch Asset for update", errorContext)
      }
    )

    this.buildForm(asset)  
  }



  saveAsset() {  
    const asset: Asset = this.formModel?.value!
    console.log(asset.id, asset.name)
    this.buildForm(asset);

    this.service.update(asset).subscribe(
      (response: Asset) => {
        //this.asset = response
        //this.asset.push(response);
        console.log("Asset Updated Successfully")
        this.buildForm(null);
        this.initList();
      },
      (errorContext) => {
        console.log("Error occured while trying to update an Asset", errorContext)
      });

    //this.buildForm(asset);

    //Fix this
    // this.toggleList();
    // this.toggleList();
    // this.toggleList();
    // this.toggleList();
    // this.toggleList();
    // this.toggleList();
  }



  cancelUpdateAsset() {
    this.buildForm(null)
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
