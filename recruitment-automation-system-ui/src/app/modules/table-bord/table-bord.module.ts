import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableBordRoutingModule } from './table-bord-routing.module';
import { MenuComponent } from './components/menu/menu.component';
import { MainComponent } from './pages/main/main.component';


@NgModule({
  declarations: [
    MenuComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    TableBordRoutingModule
  ]
})
export class TableBordModule { }
