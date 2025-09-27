import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule,  } from '@angular/common/http';
import { AssetTypeComponent } from './asset-type/asset-type.component';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AssetComponent } from './asset/asset/asset.component';
import { EmployeeComponent } from './employee/employee.component';
import { BranchComponent } from './branch/branch.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyComponent } from './company/company.component';
import { PaginationComponent } from './pagination/pagination.component';
import { dotComponent } from './ngxui/dot-pattern/dot.component';
import { AuroraComponent } from './ngxui/aurora-pattern/aurora/aurora.component';
import { CrypticTextComponent } from './ngxui/cryptic-text/cryptic-text/cryptic-text.component';



@NgModule({
  declarations: [
    CompanyComponent,
    AppComponent,
    AssetTypeComponent,
    AssetComponent,
    EmployeeComponent,
    BranchComponent,
    PaginationComponent,
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
    dotComponent,
    AuroraComponent,
    CrypticTextComponent,


],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
