import { AssetType } from './../../Models/asset-type';
import { Component, OnInit } from '@angular/core';
import { Asset } from '../../Models/asset';
import { AssetService } from '../../Services/asset.service';

import { AssetTypeService } from '../../Services/asset-type.service';
import { AssetLookup } from '../../lookup-classes/asset-lookup';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AssetTypeLookup } from '../../lookup-classes/asset-type-lookup';




@Component({
  selector: 'app-asset',
  standalone: false,

  templateUrl: './asset.component.html',
  styleUrl: './asset.component.css'
})
export class AssetComponent implements OnInit {

  constructor(private service: AssetService, private assetTypeService: AssetTypeService) { }

  assetType: AssetType[] = []
  assetLookup: AssetLookup = { id: undefined, like: '', pageIndex: 1, orderItem: "Id", itemsPerPage: 4, ascendingOrder: true }
  assetTypelookup: AssetTypeLookup = { pageIndex: 1, itemsPerPage: 10, ascendingOrder: true, orderItem: "Name" }

  asset: Asset[] = []
  canCreateNewAsset: boolean = false
  listHidden: boolean = true
  searchTerm: string = ''
  searchInvalid: boolean = false
  formModel: FormGroup<any> = new FormGroup({})
  pagesSum: number = 0
  controlNames: any



  ngOnInit(): void {

    this.assetTypeService.search(this.assetTypelookup).subscribe(
      (data: AssetType[]) => {
        this.assetType = data;
      },
      (errorContext) => {
        console.log("Error occured while trying to fetch Asset Types", errorContext);
      })

    this.service.search(this.assetLookup).subscribe(
      (data: Asset[]) => {
        this.asset = data;
        this.getElementSum()
      },
      (errorContext) => {
        console.error("Error occured while trying to display list", errorContext)
      }
    );
    this.buildForm(null)
    this.controlNames = this.getFormControlNames
  }



  initList() {
    this.listHidden = !this.listHidden
  }



  //sorting
  setOrderItem(event: any) {
    console.log("Order list by :", event.target.value);
    this.assetLookup.orderItem = event.target.value
    this.ngOnInit()
  }

  setOrderBy(event: any) {
    console.log("Ascending :", event.target.value);
    this.assetLookup.ascendingOrder = event.target.value
    this.ngOnInit()
  }

  get getFormControlNames() {
    return Object.keys(this.formModel.controls);
  }



  private buildForm(data: Asset | null) {
    this.formModel = new FormGroup({
      id: new FormControl(data?.id),
      name: new FormControl(data?.name, Validators.required), //bind value from param object to control value
      assetTypeId: new FormControl(data?.assetType?.id),
    })
  }



  getElementSum() {
    this.service.getElementSum().subscribe(
      (data: number) => {
        this.pagesSum = data / this.assetLookup.itemsPerPage;
        if (this.pagesSum % 1 != 0)
          this.pagesSum = Math.ceil(this.pagesSum) //total pages
      },
      (errorContext) => {
        console.error("Error occured while trying to display list", errorContext)
      }
    );
  }



  createNewAsset() {
    this.buildForm(null)
    this.canCreateNewAsset = !this.canCreateNewAsset;
  }



  submitNewAsset() {
    const asset = this.formModel?.value!

    this.service.update(asset).subscribe(
      (response: Asset) => {
        console.log("Asset created successfully.")
        this.asset.push(response)
        this.ngOnInit()
      },
      (errorContext) => {
        console.log("Error occured while trying to create a new Asset", errorContext);
      }
    )
  }



  updateAsset(asset: Asset) {
    this.buildForm(asset)
  }



  saveAsset() {
    const asset: Asset = this.formModel?.value!
    this.service.update(asset).subscribe(
      (response: Asset) => {
        console.log("Asset Updated Successfully:", response)
        this.buildForm(null);
        this.ngOnInit()
      },
      (errorContext) => {
        console.log("Error occured while trying to update an Asset", errorContext)
      });
  }



  cancelUpdateAsset() {
    this.buildForm(null)
  }



  deleteAsset(id: string) {
    this.asset = this.asset.filter(a => a.id !== id)
    this.service.delete(id).subscribe(
      (response) => {
        this.ngOnInit()
        console.log("Asset deleted successfully", response)
      },
      (errorContext) => {
        console.log("Error occured while trying to delete Asset", errorContext)
      })
  }



  selectPage(selectedPage: number) {
    this.assetLookup.pageIndex = selectedPage
    this.ngOnInit()
  }
  pageBack() {
    if (this.assetLookup.pageIndex > 1)
      this.assetLookup.pageIndex = this.assetLookup.pageIndex - 1
    this.ngOnInit()
  }
  pageNext() {
    if (this.assetLookup.pageIndex < this.pagesSum)
      this.assetLookup.pageIndex = this.assetLookup.pageIndex + 1
    this.ngOnInit()
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
