import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { InsightsComponent } from './insights.component';
import { ChartJSRoutingModule } from './insights-routing.module';

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TabsComponent } from '../base/tabs.component';

@NgModule({
  imports: [
    ChartJSRoutingModule,
    ChartsModule,
    TabsModule,
  ],
  declarations: [ InsightsComponent,TabsComponent ]
})
export class ChartJSModule { }
