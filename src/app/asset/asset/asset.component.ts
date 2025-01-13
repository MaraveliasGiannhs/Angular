import { AssetType } from './../../Models/asset-type';
import { Component, OnInit } from '@angular/core';
import { Asset } from '../../Models/asset';
import { AssetService } from '../../Services/asset.service';

import { AssetTypeService } from '../../Services/asset-type.service';
import { AssetLookup } from '../../lookup-classes/asset-lookup';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormsModule, Validators } from '@angular/forms';
import { errorContext } from 'rxjs/internal/util/errorContext';



@Component({
  selector: 'app-asset',
  standalone: false,

  templateUrl: './asset.component.html',
  styleUrl: './asset.component.css'
})
export class AssetComponent implements OnInit {

  constructor(private service: AssetService, private assetTypeService: AssetTypeService) { }

  assetType: AssetType[] = []
  assetLookup: AssetLookup = { id: undefined, like: '' }

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
      }
    )
  }

  toggleList() {

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

    this.canCreateNewAsset = false
  }

  private buildForm(data: Asset | null) {
    this.formModel = new FormGroup({
      id: new FormControl(data?.id /*validators?*/),
      name: new FormControl(data?.name, Validators.required), //bind value from param object to control value
      assetTypeId: new FormControl(data?.assetTypeId, Validators.required)
    })
  }

  p() {
    console.log(this.formModel.valid)
    console.log(this.formModel.get('name')?.value);  // Accessing the 'name' control value
  }

  createNewAsset() {
    this.buildForm(null)
    this.canCreateNewAsset = !this.canCreateNewAsset;
    //this.listHidden = false
  }

  submitNewAsset() {

    const asset: Asset = this.formModel?.value! //bind
    this.buildForm(asset)

    this.service.update(asset).subscribe(
      (response) => {
        console.log("Asset created successfully.")
        this.asset.push(response);
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
      return; // Exit early if the ID is invalid
    }
  }

  updateAsset(id: string, asset: Asset) {

    asset.editing = !asset.editing
    this.canCreateNewAsset = false
    this.service.get(asset.id).subscribe(
      (data: Asset) => {
        this.formModel.setValue({
          Name: data.name
        });
      },
      (errorContext) => {
        console.log("Error occured while trying to fetch Asset for update", errorContext)
      }
    )

    this.asset.forEach((a: any) => {
      a.editing = false;
    });
    asset.editing = !asset.editing
  }

  saveAsset(asset: Asset, id: string) {
    const name: string = this.formModel.get('Name')?.value!

    this.service.update(asset).subscribe(
      (response) => {
        console.log("Asset Updated Successfully")
      },
      (errorContext) => {
        console.log("Error occured while trying to update an Asset", errorContext)
      });

    asset.editing = false
    this.toggleList();
    this.toggleList();
  }

  cancelUpdateAsset(asset: Asset) {
    asset.editing = false;
  }

  deleteAsset(id: string) {
    this.asset = this.asset.filter(a => a.id !== id)

    this.service.delete(id).subscribe(
      (Response) => {
        console.log("Asset deleted successfully")
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
