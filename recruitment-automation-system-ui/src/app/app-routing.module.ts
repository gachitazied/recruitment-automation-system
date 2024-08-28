import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {ActivateAccountComponent} from "./pages/activate-account/activate-account.component";
import {LoginRecruiterComponent} from "./pages/login-recruiter/login-recruiter.component";
import {RegisterRecruiterComponent} from "./pages/register-recruiter/register-recruiter.component";
import {ActivateAccountRecComponent} from "./pages/activate-account-rec/activate-account-rec.component";
import {authGuard} from "./services/guard/auth.guard";
import {authGuardRecruiter} from "./services/guardRecruiter/auth.guard";


const routes: Routes = [
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'loginRecruiter',
    component:LoginRecruiterComponent
  },
  {
    path : 'register',
    component: RegisterComponent
  },
  {
    path : 'registerRecruiter',
    component: RegisterRecruiterComponent
  },
  {
    path : 'activate-account',
    component: ActivateAccountComponent
  }
  ,
  {
    path : 'activate-account-rec',
    component: ActivateAccountRecComponent
  },
  {
    path : 'jobs',
    loadChildren: () => import('./modules/job/job.module').then(j => j.JobModule),
    canActivate: [authGuard]
  },
  {
    path : 'tableboard',
    loadChildren: () => import('./modules/table-bord/table-bord.module').then(t => t.TableBordModule),
    canActivate: [authGuardRecruiter]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
