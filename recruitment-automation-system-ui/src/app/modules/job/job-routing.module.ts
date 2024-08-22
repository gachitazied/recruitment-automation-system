import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {JobListComponent} from "./pages/job-list/job-list.component";
import {UserDetailsComponent} from "./pages/user-details/user-details.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children :[
      {
        path:'',
        component: JobListComponent
      },
      {
        path:'my-account',
        component: UserDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobRoutingModule { }
