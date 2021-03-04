import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { InsightsComponent } from './insights.component';
import { InsightsRoutingModule } from './insights-routing.module';

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TabsComponent } from '../base/tabs.component';
import { NgApexchartsModule } from "ng-apexcharts";

@NgModule({
  imports: [
    InsightsRoutingModule,
    ChartsModule,
    TabsModule,
    NgApexchartsModule,
  ],
  declarations: [ InsightsComponent,TabsComponent ]
})
export class InsightsModule { }
