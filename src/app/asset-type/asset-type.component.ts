import { AssetType } from './../Models/asset-type';
import { AssetTypeService } from './../Services/asset-type.service';
import { Component, OnInit } from '@angular/core';
import { AssetTypeLookup } from '../lookup-classes/asset-type-lookup';
import { FormGroup, FormControl, Validators } from '@angular/forms';



            @Component({
              selector: 'app-asset-type',
              standalone: false,

              templateUrl: './asset-type.component.html',
              styleUrl: './asset-type.component.css'
            })



            export class AssetTypeComponent  {

              constructor(private service: AssetTypeService) { }



              searchTerm: string = '';
              assetTypelookup: AssetTypeLookup = { id: undefined, like: '' }
              assetType: AssetType[] = [];

              formModel: FormGroup<any> = new FormGroup({});

              listHidden: boolean = false;
              canCreateNewAssetType: boolean = false;
              editing: boolean = false;
              searchInvalid: boolean = false;

              // ngOnInit(): void {
              // }

              toggleList() {

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

              private buildForm(data: AssetType | null) {
                this.formModel = new FormGroup({
                  id: new FormControl(data?.id, /*Validators.required ?? cant create with null id*/),
                  name: new FormControl(data?.name, Validators.required)
                })
              }

              createNewAssetType() {
                this.buildForm(null);
                this.canCreateNewAssetType = !this.canCreateNewAssetType
              }

              submitNewAssetType() {

                const assetType: AssetType = this.formModel?.value!
                this.buildForm(assetType)

                this.service.update(assetType).subscribe(
                  (response) => {                                      // response is returned by the service and then can be used
                    console.log("Asset Type Created Successfully")
                    this.assetType.push(response);
                  },
                  (errorContext) => {
                    console.log("Error occured while trying to create a new Asset Type", errorContext)
                  });
              }


              p() {
                console.log(this.formModel.valid)
                console.log(this.formModel.get('name')?.value);  // Accessing the 'name' control value
              }


              deleteAssetType(id: string) {

                this.assetType = this.assetType.filter(asset => asset.id !== id); //delete (filtrer out) element from assetType list

                this.service.delete(id).subscribe(
                  (response) => {
                    console.log("Asset Type Deleted Successfully", response)
                  },
                  (errorContext) => {
                    console.log("Error occured while trying to delete a new Asset Type", errorContext)
                  });
              }

              updateAssetType(asset: AssetType) {

                this.canCreateNewAssetType = false
                this.service.get(asset.id).subscribe( //fetch asset type to display
                  (data: AssetType) => {
                    this.buildForm(data)
                  },
                  (errorContext) => {
                    console.log("Error occured while trying to fetch Asset Type for update.", errorContext)
                  }
                )
              }

              cancelUpdateAssetType() {
                this.buildForm(null);
              }

              saveAssetType() {
                const asset: AssetType = this.formModel?.value!

                this.service.update(asset).subscribe(
                  (response: AssetType) => {
                    console.log("Asset Type Updated Successfully")
                  },
                  (errorContext) => {
                    console.log("Error occured while trying to update an Asset Type", errorContext)
                  });

                this.buildForm(null);
                this.toggleList();
                this.toggleList();
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
