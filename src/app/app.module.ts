import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { AssetTypeComponent } from './asset-type/asset-type.component';
 import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Router,RouterLink } from '@angular/router';
import { AssetComponent } from './asset/asset/asset.component';
import { EmployeeComponent } from './employee/employee.component';
import { BranchComponent } from './branch/branch.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl,FormsModule } from '@angular/forms';
import { CompanyComponent } from './company/company.component';
import { AssetLookup } from './lookup-classes/asset-lookup';
 


@NgModule({
  declarations: [
    CompanyComponent,
    AppComponent,
    AssetTypeComponent,
    AssetComponent,
    EmployeeComponent,
    BranchComponent,


  ],
  imports: [
    
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    NgTemplateOutlet,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
