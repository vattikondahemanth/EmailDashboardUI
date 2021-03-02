import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { ChartJSComponent } from './chartjs.component';
import { ChartJSRoutingModule } from './chartjs-routing.module';

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TabsComponent } from '../base/tabs.component';

@NgModule({
  imports: [
    ChartJSRoutingModule,
    ChartsModule,
    TabsModule,
  ],
  declarations: [ ChartJSComponent,TabsComponent ]
})
export class ChartJSModule { }
