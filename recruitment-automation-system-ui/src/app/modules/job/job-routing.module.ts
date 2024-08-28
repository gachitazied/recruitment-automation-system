import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { JobListComponent } from './pages/job-list/job-list.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { ApplyManageComponent } from './pages/apply-manage/apply-manage.component';
import {ApplicationListComponent} from "./pages/application-list/application-list.component";
import {NotifListComponent} from "./pages/notif-list/notif-list.component";
import {authGuard} from "../../services/guard/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: JobListComponent, canActivate: [authGuard] },
      { path: 'my-account', component: UserDetailsComponent, canActivate: [authGuard] },
      { path: 'apply-manage/:job_id', component: ApplyManageComponent, canActivate: [authGuard] },
      {path:'my-applications',component:ApplicationListComponent, canActivate: [authGuard]},
      {path:'notification',component:NotifListComponent, canActivate: [authGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobRoutingModule { }
