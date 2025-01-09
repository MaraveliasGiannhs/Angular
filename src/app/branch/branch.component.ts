import { Component, OnInit } from '@angular/core';
import { Branch } from '../Models/branch';
import { BranchService } from '../Services/branch.service';
import { HttpClient } from '@angular/common/http';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { Employee } from '../Models/employee';
import { EmployeeService } from '../Services/employee.service';
@Component({
  selector: 'app-branch',
  standalone: false,
  
  templateUrl: './branch.component.html',
  styleUrl: './branch.component.css'
})
export class BranchComponent implements OnInit{


  constructor(private service: BranchService,private employeeService: EmployeeService, private http: HttpClient){}
  
    employee: Employee[] = []
    branch: Branch[] =[]
  
    canCreateNewBranch: boolean = false
    listHidden: boolean = false
    searchTerm: string = ''
    searchInvalid: boolean = false
    editing: boolean = false
  
    ngOnInit(): void {
  
      this.employeeService.getAll().subscribe(
        (data:Employee[]) => {
          this.employee = data;
        },
        (errorContext) => {
          console.log("Error occured while trying to fetch Asset Types", errorContext);
        }
      )
    }
  
    toggleList(){

      this.searchInvalid = false;
      this.service.getAll().subscribe(
        (data: Branch[]) => { //?
          this.branch = data;
          this.listHidden = !this.listHidden;
        },
        (errorContext) => {
          console.error("Error occured while trying to display list", errorContext)
        }
      );
      
    }
  
    createNewBranch( ){
      this.canCreateNewBranch = true;
    }
  
    submitNewBranch(name: string, assetTypeId : string){
  
      this.service.create(name, assetTypeId).subscribe(
        (response) =>{
          console.log("Branch created successfully.")
          this.branch.push(response);
        },
        (errorContext) =>{
          console.log("Error occured while trying to create a new Branch", errorContext);
        }
      )
    }
  
    searchBranchById(id: string){
      if (!id || id.trim().length === 0) {
        console.error("Invalid ID: ID is empty or contains only spaces.");
        this.branch = [];
        this.searchInvalid = true;
        return; 
      }
    }
    updateBranch(id: string, branch: Branch){
      branch.editing = !branch.editing
    }
  
    saveBranch(branch: Branch){
      this.service.update(branch.id, branch.name, branch.companyId ).subscribe(
        (response) =>{
        console.log("Branch Updated Successfully")
        },
        (errorContext)=>{
          console.log("Error occured while trying to update a Branch", errorContext)
        });
  
        branch.editing = false
    }
  
    cancelUpdateBranch(branch : Branch){
      branch.editing = false;
    }
  
    deleteBranch(id: string){
      this.branch = this.branch.filter(b => b.id !== id)
  
      this.service.delete(id).subscribe(
        (Response) =>{
          console.log("Branch deleted successfully")
        },
        (errorContext) =>{
          console.log("Error occured while trying to delete Branch" , errorContext)
        })
    }
  
  
}
