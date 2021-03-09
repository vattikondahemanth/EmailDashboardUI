import { Component, VERSION ,ViewChild,OnInit } from '@angular/core';
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ActionableEmailService } from '../../services/actionable-email.service';
import { CriticalClientEmailService } from '../../services/critical-client-email.service';


import {ChartComponent,
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexChart,
  ApexPlotOptions
} from "ng-apexcharts";

import { from } from 'rxjs';

export type ChartHeatOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
};

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor( 
    public actionEmail:ActionableEmailService,
    public criticalEmail:CriticalClientEmailService
    ){}
start_date = '2020-03-08';
end_date   = '2021-03-08';
frequency  = 'W-MON';
  
//STACK BAR START//

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{ ticks: { stepSize: 5} }], yAxes: [{}] },
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [];
  


  emailUserStackBar(){
    let X_Array = [];
    let Y_Array = [];
    let text1_array = [];
    let text2_array = [];
    let body = {
      "filters": {
        "start_date": "2020-03-08T19:04:38.060922",
        "end_date": "2021-03-08T19:04:38.060975",
        "frequency": "W-MON"
      }
    }; 
    console.log(body);
    this.actionEmail.getUserEmails(body)
       .then((data) => {
        let X = data.data[0].x;
        let Y = data.data[0].y
        let text1 = data.data[0].text;
        let text2 = data.data[1].text;
        Object.keys(X).map((X_Index)=>{
          var val = X[X_Index];
          X_Array.push(val);
        });
        
        Object.keys(text1).map((text1_Index)=>{
          var val = text1[text1_Index];
          text1_array.push(val);
        });

        Object.keys(text2).map((text2_Index)=>{
          var val = text2[text2_Index];
          text2_array.push(val);
        });

        this.barChartLabels = X_Array;
        this.barChartData   = [{ 
        data: text1_array, label: 'External', 
        stack: 'a',backgroundColor: '#435eab',
        borderColor: '#435eab',
        hoverBackgroundColor:'#435eab',
        barThickness: 20, },
        {
        data: text2_array, 
        label: 'Internal', 
        stack: 'a',
        backgroundColor: '#435eeb',
        borderColor: '#435eeb',
        hoverBackgroundColor:'#435eeb',
        barThickness: 20,
       }];

    }).catch((err) => {
       console.log('catch');
    });
  }
//STACK BAR END//




//BAR CHART ESCALATED START//
// onDateChange(){
//   console.log(this.end_date);
//   console.log(this.start_date);
// }
startDateChange(date){
  this.start_date = date;
}

endDateChange(date){
  this.end_date = date;
  console.log(this.start_date);
  console.log(this.end_date);
  this.emailReceiveBarChart();
  this.emailReceiveLineChart();
  
}

criticalEmailChange(value:any){
  this.frequency = value;
  this.emailReceiveBarChart();
  this.emailReceiveLineChart();
}

  barChartEscalatedOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [{
      }],
      yAxes: [{
            scaleLabel : {
              display : true,
              labelString : "Number of Emails",
              fontSize : 11
            }
      }],
    },
  };

  barChartEscalatedLabels: any[] = [];
  public barChartEscalatedType = 'bar';
  public barChartEscalatedLegend = true;
  public barChartEscalatedData: any[] = [];

  emailReceiveBarChart(){
    let X_Array = [];
    let Y_Array = [];
    let text1_array = [];
    let text2_array = [];
    this.barChartEscalatedLabels = [];
    let body = {
      "filters": {
        "start_date": this.start_date+"T19:04:38.060922",
        "end_date":   this.end_date+"T19:04:38.060975",
        "frequency":  this.frequency,
      }
    }; 
    console.log(body);
    this.criticalEmail.getEmailCount(body)
    .then((data) => {
     let X = data.data[0].x;
     let Y = data.data[0].y;
     let text1 = data.data[0].text;
     let text2 = data.data[1].text;
     Object.keys(X).map((X_Index)=>{
       var val = X[X_Index];
       X_Array.push(val);
     });
     
     Object.keys(text1).map((text1_Index)=>{
       var val = text1[text1_Index];
       text1_array.push(val);
     });

     Object.keys(text2).map((text2_Index)=>{
       var val = text2[text2_Index];
       text2_array.push(val);
     });

     this.barChartEscalatedLabels = X_Array;
     console.log(X_Array);
     console.log(text1_array);
     console.log(text2_array)
     this.barChartEscalatedData = [{
        data: text1_array,
        label: 'Received',
        backgroundColor: '#435eeb',
        borderColor: '#435eeb',
        hoverBackgroundColor:'#435eeb',
        barThickness: 15,
    
      },
      { 
        data: text2_array,
        label: 'Responded',
        backgroundColor: '#435eab',
        borderColor: '#435eab',
        hoverBackgroundColor:'#435eab',
        barThickness: 15,
      }]
   });
}
 //BAR CHART ESCALATED END//
  



//LINE CHART START//
  public lineChart2Data: Array<any> = [];
  public lineChart2Labels: Array<any> = [];
  public lineChart2Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    scales: {
      xAxes: [{

      }],
      yAxes: [{
        
      }],
    },
    elements: {
      line: {
        tension: 0.00001,
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart2Colours: Array<any> = [{ 
        borderColor: 'rgba(7, 11, 230,.55)'
  }];
  public lineChart2Legend = false;
  public lineChart2Type = 'line';

  emailReceiveLineChart(){
    let X_Array = [];
    let Y_Array = [];
    let body = {
      "filters": {
        "start_date": "2020-03-08T19:04:38.060922",
        "end_date": "2021-03-08T19:04:38.060975",
        "frequency": this.frequency
      }
    };

    this.criticalEmail.getEmailResponse(body)
    .then((data) => {
     let X = data.data[0].x;
     let Y = data.data[0].y;

     Object.keys(X).map((X_Index)=>{
       var val = X[X_Index];
       X_Array.push(val);
     });

     Object.keys(Y).map((Y_Index)=>{
      var val = Y[Y_Index];
      Y_Array.push(val);
     });
     
      this.lineChart2Labels = X_Array;
      this.lineChart2Data = [{
        data: Y_Array
      }];
    });
  }
  //LINE CHART END//


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }


//HEATMAP STARTED//
@ViewChild("chart") chart: ChartComponent;
public chartHeatOptions: Partial<ChartHeatOptions>;
  ngOnInit(){
    this.emailUserStackBar();
    this.emailReceiveBarChart();
    this.emailReceiveLineChart();
    
    this.chartHeatOptions = {
      series: [
        {
          name: "Jan",
          data: this.generateData(20, {
            min: -30,
            max: 55
          })
        },
        {
          name: "Feb",
          data: this.generateData(20, {
            min: -30,
            max: 55
          })
        },
        {
          name: "Mar",
          data: this.generateData(20, {
            min: -30,
            max: 55
          })
        },
        {
          name: "Apr",
          data: this.generateData(20, {
            min: -30,
            max: 55
          })
        },
        {
          name: "May",
          data: this.generateData(20, {
            min: -30,
            max: 55
          })
        },
        {
          name: "Jun",
          data: this.generateData(20, {
            min: -30,
            max: 55
          })
        },
        // {
        //   name: "Jul",
        //   data: this.generateData(20, {
        //     min: -30,
        //     max: 55
        //   })
        // },
        // {
        //   name: "Aug",
        //   data: this.generateData(20, {
        //     min: -30,
        //     max: 55
        //   })
        // },
        // {
        //   name: "Sep",
        //   data: this.generateData(20, {
        //     min: -30,
        //     max: 55
        //   })
        // }
      ],
      chart: {
        // height: 350,
        height: 200,
        type: "heatmap"
      },
      plotOptions: {
        heatmap: {
          shadeIntensity: 0.5,
          colorScale: {
            ranges: [
              {
                from: -30,
                to: 5,
                name: "low",
                color: "#c5ebc9"
                // color: "#00A100"
              },
              {
                from: 6,
                to: 20,
                name: "medium",
                color: "#7fd488"
                // color: "#128FD9"
              },
              {
                from: 21,
                to: 45,
                name: "high",
                color: "#43a84e"
                // color: "#FFB200"
              },
              {
                from: 46,
                to: 55,
                name: "extreme",
                color: "#05b018"
                // color: "#FF0000"
              }
            ]
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      // title: {
      //   text: "HeatMap Chart"
      // }
    };
  }

  public generateData(count, yrange) {
    var i = 0;
    var series = [];
    // while (i < count) {
      while (i < 10) {
      var x = "W" + (i + 1).toString();
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push({
        x: x,
        y: y
      });
      i++;
    }
    return series;
  }

//HEATMAP END//





}
