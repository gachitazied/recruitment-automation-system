import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobRoutingModule } from './job-routing.module';
import { JobCardComponent } from './components/job-card/job-card.component';
import { MenuComponent } from './components/menu/menu.component';
import { MainComponent } from './pages/main/main.component';
import { JobListComponent } from './pages/job-list/job-list.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    JobCardComponent,
    MenuComponent,
    MainComponent,
    JobListComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    JobRoutingModule
  ]
})
export class JobModule { }
