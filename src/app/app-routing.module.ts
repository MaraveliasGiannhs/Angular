import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AssetTypeComponent } from './asset-type/asset-type.component';
import { HttpClient } from '@angular/common/http';
import { AssetComponent } from './asset/asset/asset.component';
import { EmployeeComponent } from './employee/employee.component';


const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'prefix' }, // Default route
  { path: 'asset-type', component: AssetTypeComponent },
  { path: 'asset', component: AssetComponent },
  { path: 'employee', component: EmployeeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
