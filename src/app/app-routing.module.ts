import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AssetTypeComponent } from './asset-type/asset-type.component';
import { HttpClient } from '@angular/common/http';
import { AssetComponent } from './asset/asset/asset.component';
import { EmployeeComponent } from './employee/employee.component';
import { BranchComponent } from './branch/branch.component';
import { CompanyComponent } from './company/company.component';
import { PaginationComponent } from './pagination/pagination.component';


const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'prefix' }, // Default route
  { path: 'asset-type', component: AssetTypeComponent },
  { path: 'asset', component: AssetComponent },
  { path: 'employee', component: EmployeeComponent},
  { path: 'branch', component: BranchComponent},
  { path: 'company', component: CompanyComponent},
  { path: 'pagination', component: PaginationComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
