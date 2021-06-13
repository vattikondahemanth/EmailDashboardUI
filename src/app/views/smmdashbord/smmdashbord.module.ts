import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { HighchartsChartModule } from 'highcharts-angular';
import { SMMdashbordComponent } from './smmdashbord.component'
import { SMMdashboardRoutingModule } from './smmdashbord-routing.module'
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CommonModule } from '@angular/common';
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
    imports: [
      FormsModule,
      SMMdashboardRoutingModule,
      ChartsModule,
      BsDropdownModule,
      HighchartsChartModule,
      ButtonsModule.forRoot(),
      CollapseModule.forRoot(),
      CommonModule,
      GoogleChartsModule
    ],
    declarations: [ SMMdashbordComponent ]
  })

export class SMMdashbordModule { }