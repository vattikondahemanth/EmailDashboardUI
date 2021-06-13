import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { InsightsComponent } from './insights.component';
import { InsightsRoutingModule } from './insights-routing.module';
import { DecimalPipe } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TabsComponent } from '../base/tabs.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  imports: [
    InsightsRoutingModule,
    ChartsModule,
    TabsModule,
    NgApexchartsModule,
    CommonModule,
    NgxSpinnerModule
  ],
  declarations: [ InsightsComponent,TabsComponent ],
  providers: [DecimalPipe],
})
export class InsightsModule { }
