import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { JobListComponent } from './pages/job-list/job-list.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { ApplyManageComponent } from './pages/apply-manage/apply-manage.component';
import {ApplicationListComponent} from "./pages/application-list/application-list.component";
import {NotifListComponent} from "./pages/notif-list/notif-list.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: JobListComponent },
      { path: 'my-account', component: UserDetailsComponent },
      { path: 'apply-manage/:job_id', component: ApplyManageComponent },
      {path:'my-applications',component:ApplicationListComponent},
      {path:'notification',component:NotifListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobRoutingModule { }
