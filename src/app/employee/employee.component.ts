
import { Component } from '@angular/core';
import { EmployeeService } from '../Services/employee.service';
import { Employee } from '../Models/employee';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee',
  standalone: false,

  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})

export class EmployeeComponent {

    constructor(private service: EmployeeService, private http: HttpClient){}

    employee: Employee[] =[]

    canCreateNewEmployee: boolean = false
    listHidden: boolean = false
    searchTerm: string = ''
    searchInvalid: boolean = false
    editing: boolean = false


    toggleList(){

      this.searchInvalid = false;

      this.service.getAll().subscribe(
            (data: Employee[]) => {
              this.employee = data;
              this.listHidden = !this.listHidden;
              console.log("All Employees displayed successfully")
            },
            (errorContext) => {
              console.error("Error occured while trying to display list", errorContext)
            }
          );
    }

    createNewEmployee( ){
      this.canCreateNewEmployee = true;
    }

    submitNewEmployee(name: string, date: string){

      this.service.create(name, date).subscribe(
        (response) =>{
          console.log("Employee created successfully.")
          this.employee.push(response);
        },
        (errorContext) =>{
          console.log("Error occured while trying to create a new Employee", errorContext);
        }
      )

    }

    searchEmployeeByName(id: string){

      if (!id || id.trim().length === 0) {
        console.error("Invalid ID: ID is empty or contains only spaces.");
        this.employee = [];
        this.searchInvalid = true;
        return; // Exit early if the ID is invalid
      }

      this.service.get(id).subscribe(
        (response) => {
          console.log(`Asset Type with id: ${id} found.`);
          this.employee = this.employee.filter(e => e.id === id && e.id != null);
          this.searchInvalid = false;
        },
        (errorContext) => {
          this.employee = [];
          console.error("Error occurred while trying to find an Asset Type", errorContext);
          this.searchInvalid = true;
        }
      );

    }

    updateEmployee(id: string, employee: Employee){
      employee.editing = !employee.editing
    }

    saveEmployee(employee: Employee){
      this.service.update(employee.id, employee.name, employee.finishedWorkAt).subscribe(
        (response) =>{
        console.log("Asset Type Updated Successfully")
        },
        (errorContext)=>{
          console.log("Error occured while trying to update an Employee", errorContext)
        });

        employee.editing = false
    }

    cancelUpdateEmployee(employee : Employee){
      employee.editing = false;
    }

    deleteEmployee(id: string){
      this.employee = this.employee.filter(e => e.id !== id)

      this.service.delete(id).subscribe(
        (Response) =>{
          console.log("Employee deleted successfully")
        },
        (errorContext) =>{
          console.log("Error occured while trying to delete Employee" , errorContext)
        })
    }


}
