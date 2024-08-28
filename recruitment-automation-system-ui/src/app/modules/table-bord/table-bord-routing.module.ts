import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainTableBordComponent} from "./pages/main-table-bord/main-table-bord.component";
import {JobListBordComponent} from "./pages/job-list-bord/job-list-bord.component";
import {ManageJobsBordComponent} from "./pages/manage-jobs-bord/manage-jobs-bord.component";
import {UpdateJobsBordComponent} from "./pages/update-jobs-bord/update-jobs-bord.component";
import {ApplicationListBordComponent} from "./pages/application-list-bord/application-list-bord.component";
import {StaticApplicationComponent} from "./pages/static-application/static-application.component";
import {authGuardRecruiter} from "../../services/guardRecruiter/auth.guard";


const routes: Routes = [
  {
    path: '',
    component: MainTableBordComponent,
      canActivate: [authGuardRecruiter],
    children: [

        { path: '', component: JobListBordComponent, canActivate: [authGuardRecruiter] },
        { path: 'add-job', component: ManageJobsBordComponent, canActivate: [authGuardRecruiter] },
        {path: 'edit-job/:id', component: UpdateJobsBordComponent, canActivate: [authGuardRecruiter]},
        {path:'applicationsBord',component: ApplicationListBordComponent, canActivate: [authGuardRecruiter]},
        {path: 'staticApplicationsBord',component: StaticApplicationComponent, canActivate: [authGuardRecruiter]}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableBordRoutingModule {}
