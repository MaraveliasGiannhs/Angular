import { AssetType } from './../Models/asset-type';
import { AssetTypeService } from './../Services/asset-type.service';
import { Component, OnInit } from '@angular/core';
import { AssetTypeLookup } from '../lookup-classes/asset-type-lookup';
import {FormGroup, FormControl,Validators} from '@angular/forms';
 


@Component({
  selector: 'app-asset-type',
  standalone: false,

  templateUrl: './asset-type.component.html',
  styleUrl: './asset-type.component.css'
})



export class AssetTypeComponent implements OnInit {

  constructor( private service : AssetTypeService ){}
    
 

  searchTerm: string = '';
  assetTypelookup: AssetTypeLookup = {id: undefined, like: ''}
  assetType : AssetType[] = [];

  formModel = new FormGroup({
    Name: new FormControl('', Validators.required) 
  })

  listHidden : boolean = false;
  canCreateNewAssetType : boolean = false;
  editing: boolean = false;
  searchInvalid: boolean = false;

  ngOnInit(): void {
    // this.formModel.patchValue({
    //   Name: this.assetType
    // });
  }

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
    
    if(this.formModel.valid){
      this.service.create(name).subscribe(

        (response) =>{ // response is returned by the service and then can be used
        console.log("Asset Type Created Successfully")
        this.assetType.push(response);

        },
        (errorContext)=>{
          console.log("Error occured while trying to create a new Asset Type",errorContext)
        });
      }
      else 
        console.log("Form Invalid.")
  }

  deleteAssetType(id:string){

    this.assetType = this.assetType.filter(asset => asset.id !== id); //delete (filtrer out) element from assetType list

    this.service.delete(id).subscribe(
      () =>{
      console.log("Asset Type Deleted Successfully")
      },
      (errorContext)=>{
        console.log("Error occured while trying to delete a new Asset Type", errorContext)
      });
  }

  updateAssetType(asset:AssetType){

    this.canCreateNewAssetType = false
      this.service.get(asset.id).subscribe( //fetch asset type to display
        (data: AssetType) =>{
          this.formModel.setValue({
            Name : data.name
          }); 
        },
        (errorContext) =>{
          console.log("Error occured while trying to fetch Asset Type for update.", errorContext)
        }
      )

      this.assetType.forEach((a: any) => { //turn off editing for others
          a.editing = false;
      });
      asset.editing = !asset.editing;
  }

  cancelUpdateAssetType(asset : AssetType){
    asset.editing = false;
  }

  saveAssetType(asset: AssetType){
    const name: string = this.formModel.get('Name')?.value!
    
      this.service.update(asset.id, name ).subscribe(
        (response: AssetType) =>{
        console.log("Asset Type Updated Successfully")
      },
        (errorContext)=>{
        console.log("Error occured while trying to update an Asset Type", errorContext)
      });
        asset.editing = false
        this.toggleList();
        this.toggleList();
      }
      

  // searchAssetTypeByName(id: string){

  //     if (!id || id.trim().length === 0) {
  //       console.error("Invalid ID: ID is empty or contains only spaces.");
  //       this.assetType = [];
  //       this.searchInvalid = true;
  //       return; // Exit early if the ID is invalid
  //     }

  //     this.service.get(id).subscribe(
  //       (response) =>{
  //       console.log(`Asset Type with id: ${id} found.`)
  //       this.assetType = this.assetType.filter(asset => asset.id === id && asset.id != null); //???
  //       this.searchInvalid = false;
  //       },
  //       (errorContext)=>{
  //         this.assetType = []
  //         console.log("Error occured while trying to find an Asset Type")
  //         this.searchInvalid = true;
  //       });

  //       console.log(this.searchInvalid)
  // }

  searchAssetTypeDynamically(){

      if (!this.assetTypelookup.id || this.assetTypelookup.id.trim() === '')
        this.assetTypelookup.id = undefined

      this.service.search(this.assetTypelookup).subscribe(
        (response: AssetType[]) =>{
          console.log("Search results for Asset Types updated.")
          this.assetType = response;
        },
        (errorContext) =>{
          console.log("Error occured while searching Asset Type.", errorContext)
        }
      )
  }

}
