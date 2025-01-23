import { AssetType } from './../Models/asset-type';
import { AssetTypeService } from './../Services/asset-type.service';
import { Component, Input, numberAttribute, OnInit } from '@angular/core';
import { AssetTypeLookup } from '../lookup-classes/asset-type-lookup';
import { FormGroup, FormControl, Validators } from '@angular/forms';



            @Component({
              selector: 'app-asset-type',
              standalone: false,

              templateUrl: './asset-type.component.html',
              styleUrl: './asset-type.component.css'
            })



            export class AssetTypeComponent implements OnInit  {

              constructor(private service: AssetTypeService) { }

              searchTerm: string = '';
              assetTypelookup: AssetTypeLookup = {pageIndex: 1, itemsPerPage : 4, ascendingOrder:true, orderItem:"Id" }
              assetType: AssetType[] = [];

              formModel: FormGroup<any> = new FormGroup({});

              listHidden: boolean = true;
              canCreateNewAssetType: boolean = false;
              editing: boolean = false;
              searchInvalid: boolean = false;

              pagesSum: number = 0
              controlNames:any

              ngOnInit(): void {
                this.service.search(this.assetTypelookup).subscribe(
                  (data: AssetType[]) => {
                    this.assetType = data;
                    this.getElementSum()
                  },
                  (errorContext) => {
                    console.error("Error occured while trying to display list", errorContext)
                  }
                );
                
                this.buildForm(null) //initialize otherwise the getter returns nothing
                this.controlNames = this.getFormControlNames
              }

              initList() {
                this.listHidden = !this.listHidden;
              }



              setOrderItem(event: any){
                console.log("Order list by :", event.target.value);
                this.assetTypelookup.orderItem = event.target.value
                this.ngOnInit()
              }

              setOrderBy(event: any){
                console.log("Ascending :", event.target.value);
                this.assetTypelookup.ascendingOrder = event.target.value
                this.ngOnInit()
              }





              selectPage(selectedPage : number){
                this.assetTypelookup.pageIndex = selectedPage
                this.ngOnInit()
              }
              pageBack(){
                if(this.assetTypelookup.pageIndex > 1)
                  this.assetTypelookup.pageIndex = this.assetTypelookup.pageIndex-1
                this.ngOnInit()
              }
              pageNext(){
                if(this.assetTypelookup.pageIndex < this.pagesSum)
                  this.assetTypelookup.pageIndex = this.assetTypelookup.pageIndex+1
                this.ngOnInit()
              }



              getElementSum(){
                this.service.getElementSum().subscribe(
                  (data: number) => {

                    this.pagesSum = data / this.assetTypelookup.itemsPerPage;
                    if(this.pagesSum % 1 != 0)
                      this.pagesSum = Math.ceil(this.pagesSum) //total pages
                    
                  },
                  (errorContext) => {
                    console.error("Error occured while trying to display list", errorContext)
                  }
                );
              }




              get getFormControlNames(){
                return Object.keys(this.formModel.controls);  
              }




              private buildForm(data: AssetType | null) {
                this.formModel = new FormGroup({
                  id: new FormControl(data?.id),
                  name: new FormControl(data?.name, Validators.required)
                })
              }



              createNewAssetType() {
                this.buildForm(null);
                this.canCreateNewAssetType = !this.canCreateNewAssetType
                this.listHidden = false
              }



              submitNewAssetType() {

                const assetType: AssetType = this.formModel?.value!
                this.buildForm(assetType)

                this.service.update(assetType).subscribe(
                  (response) => {                                      // response is returned by the service and then can be used
                    console.log("Asset Type Created Successfully")
                    this.assetType.push(response);
                    this.ngOnInit()

                  },
                  (errorContext) => {
                    console.log("Error occured while trying to create a new Asset Type", errorContext)
                  });
              }



              deleteAssetType(id: string) {
                this.assetType = this.assetType.filter(asset => asset.id !== id); //delete (filtrer out) element from assetType list

                this.service.delete(id).subscribe(
                  (response) => {
                    this.ngOnInit()
                    console.log("Asset Type Deleted Successfully", response)
                  },
                  (errorContext) => {
                    console.log("Error occured while trying to delete a new Asset Type", errorContext)
                  });
              }



              updateAssetType(assetType: AssetType) {
                this.canCreateNewAssetType = false
                this.buildForm(assetType)
                this.service.get(assetType.id).subscribe( //fetch asset type to display
                  (data: AssetType) => {
                    //this.buildForm(data)
                  },
                  (errorContext) => {
                    console.log("Error occured while trying to fetch Asset Type for update.", errorContext)
                  }
                )
                this.buildForm(assetType)  
              }



              cancelUpdateAssetType() {
                this.buildForm(null);
              }



              saveAssetType() {
                const assetType: AssetType = this.formModel?.value!
                this.buildForm(assetType)

                this.service.update(assetType).subscribe(
                  (response: AssetType) => {
                    console.log("Asset Type Updated Successfully")
                    this.buildForm(null);
                    this.initList();
                  },
                  (errorContext) => {
                    console.log("Error occured while trying to update an Asset Type", errorContext)
                  });
                
                //this.initList();
              }



              searchAssetTypeDynamically() {
                if (!this.assetTypelookup.id || this.assetTypelookup.id.trim() === '')
                  this.assetTypelookup.id = undefined

                this.service.search(this.assetTypelookup).subscribe(
                  (response: AssetType[]) => {
                    console.log("Search results for Asset Types updated.")
                    this.assetType = response;
                  },
                  (errorContext) => {
                    console.log("Error occured while searching Asset Type.", errorContext)
                  }
                )
              }

            }
