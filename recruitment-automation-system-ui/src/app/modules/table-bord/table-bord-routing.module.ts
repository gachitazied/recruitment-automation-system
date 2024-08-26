import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainTableBordComponent} from "./pages/main-table-bord/main-table-bord.component";
import {JobListBordComponent} from "./pages/job-list-bord/job-list-bord.component";
import {ManageJobsBordComponent} from "./pages/manage-jobs-bord/manage-jobs-bord.component";
import {UpdateJobsBordComponent} from "./pages/update-jobs-bord/update-jobs-bord.component";
import {ApplicationListBordComponent} from "./pages/application-list-bord/application-list-bord.component";
import {StaticApplicationComponent} from "./pages/static-application/static-application.component";


const routes: Routes = [
  {
    path: '',
    component: MainTableBordComponent,
    children: [

        { path: 'jobsBord', component: JobListBordComponent },
        { path: 'add-job', component: ManageJobsBordComponent },
        {path: 'edit-job/:id', component: UpdateJobsBordComponent},
        {path:'applicationsBord',component: ApplicationListBordComponent},
        {path: 'staticApplicationsBord',component: StaticApplicationComponent}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableBordRoutingModule {}
