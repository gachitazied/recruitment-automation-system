import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableBordRoutingModule } from './table-bord-routing.module';


import { MenuTableBordComponent } from './components/menu-table-bord/menu-table-bord.component';
import {MainTableBordComponent} from "./pages/main-table-bord/main-table-bord.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { JobCardBordComponent } from './components/job-card-bord/job-card-bord.component';
import { JobListBordComponent } from './pages/job-list-bord/job-list-bord.component';
import { ManageJobsBordComponent } from './pages/manage-jobs-bord/manage-jobs-bord.component';
import { UpdateJobsBordComponent } from './pages/update-jobs-bord/update-jobs-bord.component';
import { ApplicationCardBordComponent } from './components/application-card-bord/application-card-bord.component';
import { ApplicationListBordComponent } from './pages/application-list-bord/application-list-bord.component';
import {Chart} from "chart.js";
import {StaticApplicationComponent} from "./pages/static-application/static-application.component";



@NgModule({
  declarations: [
    MenuTableBordComponent,
    MainTableBordComponent,
    JobCardBordComponent,
    JobListBordComponent,
    ManageJobsBordComponent,
    UpdateJobsBordComponent,
    ApplicationCardBordComponent,
    ApplicationListBordComponent,
    StaticApplicationComponent
  ],
  imports: [
    CommonModule,
    TableBordRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TableBordModule { }
