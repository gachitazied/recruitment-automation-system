import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobRoutingModule } from './job-routing.module';
import { JobCardComponent } from './components/job-card/job-card.component';
import { MenuComponent } from './components/menu/menu.component';
import { MainComponent } from './pages/main/main.component';
import { JobListComponent } from './pages/job-list/job-list.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import {FormsModule} from "@angular/forms";
import { ApplyManageComponent } from './pages/apply-manage/apply-manage.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { ApplicationCardComponent } from './components/application-card/application-card.component';
import { ApplicationListComponent } from './pages/application-list/application-list.component';


@NgModule({
  declarations: [
    JobCardComponent,
    MenuComponent,
    MainComponent,
    JobListComponent,
    UserDetailsComponent,
    ApplyManageComponent,
    NotificationComponent,
    ApplicationCardComponent,
    ApplicationListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    JobRoutingModule,

  ]
})
export class JobModule { }
