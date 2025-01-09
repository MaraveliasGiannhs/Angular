import { Component } from '@angular/core';
import { CompanyService } from '../Services/company.service';
import { HttpClient } from '@angular/common/http';
import { Company } from '../Models/company';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { Branch } from '../Models/branch';
@Component({
  selector: 'app-company',
  standalone: false,
  
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent {

  constructor(private service: CompanyService, public router : Router ){}
  
    company: Company[] = []
    branches: Branch[] = []
    
    canCreateNewCompany: boolean = false
    listHidden: boolean = false
    searchTerm: string = ''
    searchInvalid: boolean = false
    editing: boolean = false
  
   
    toggleList(){
  
      this.searchInvalid = false;
  
      this.service.getAll().subscribe(
        (data: Company[]) => {
          this.company = data;
          this.listHidden = !this.listHidden;
        },
        (errorContext) => {
          console.error("Error occured while trying to display list", errorContext)
        }
      );
    }
  
    createCompany( ){
      this.canCreateNewCompany = !this.canCreateNewCompany;
    }
  
    submitNewCompany(name: string){
  
      this.service.create(name).subscribe(
        (response) =>{
          console.log("Company created successfully.")
          this.company.push(response);
        },
        (errorContext) =>{
          console.log("Error occured while trying to create a new Company", errorContext);
        }
      )
    }
  
    searchCompanyById(id: string){
      // if (!id || id.trim().length === 0) {
      //   console.error("Invalid ID: ID is empty or contains only spaces.");
      //   this.asset = [];
      //   this.searchInvalid = true;
      //   return; // Exit early if the ID is invalid
      // }
    }
    updateCompany(id: string, company: Company){
      company.editing = !company.editing
    }
  
    saveCompany(company: Company){
      this.service.update(company.id, company.name ).subscribe(
        (response) =>{
        console.log("Company Updated Successfully")
        },
        (errorContext)=>{
          console.log("Error occured while trying to update an Company", errorContext)
        });
  
        company.editing = false
        this.toggleList();
        this.listHidden = false
    }
  
    cancelUpdateCompany(company : Company){
      company.editing = false;
    }
  
    deleteCompany(id: string){
      this.company = this.company.filter(c => c.id !== id)
  
      this.service.delete(id).subscribe(
        (Response) =>{
          console.log("Company deleted successfully")
        },
        (errorContext) =>{
          console.log("Error occured while trying to delete Company" , errorContext)
        })
    }
  
  

}
