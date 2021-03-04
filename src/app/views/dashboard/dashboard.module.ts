import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TabsComponent } from '../base/tabs.component';
import { NgApexchartsModule } from "ng-apexcharts";

@NgModule({
  imports: [
    DashboardRoutingModule,
    ChartsModule,
    TabsModule,
    NgApexchartsModule,
  ],
  declarations: [ DashboardComponent,TabsComponent ]
})
export class DashboardModule { }