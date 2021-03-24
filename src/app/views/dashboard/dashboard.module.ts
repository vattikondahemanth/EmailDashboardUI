import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TabsComponent } from '../base/tabs.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [
    DashboardRoutingModule,
    ChartsModule,
    CommonModule,
    TabsModule,
    NgApexchartsModule,
    FormsModule,
    AgGridModule.withComponents([]),
    PaginationModule.forRoot()
  ],
  declarations: [ DashboardComponent,TabsComponent ]
})
export class DashboardModule { }
