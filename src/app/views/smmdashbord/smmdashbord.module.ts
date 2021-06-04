import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { HighchartsChartModule } from 'highcharts-angular';

import { SMMdashbordComponent } from './smmdashbord.component'
import { SMMdashboardRoutingModule } from './smmdashbord-routing.module'

@NgModule({
    imports: [
      FormsModule,
      SMMdashboardRoutingModule,
      ChartsModule,
      BsDropdownModule,
      HighchartsChartModule,
      ButtonsModule.forRoot()
    ],
    declarations: [ SMMdashbordComponent ]
  })

export class SMMdashbordModule { }