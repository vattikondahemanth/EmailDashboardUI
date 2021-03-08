import { Component, VERSION ,ViewChild,OnInit } from '@angular/core';
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ActionableEmailService } from '../../services/actionable-email.service';


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
  constructor( public actionEmail:ActionableEmailService ){}
  body ='';
  //persons = '';
  X_Array = [];
  Y_Array = [];
  text1_array = [];
  text2_array = [];
  data1 = '';
  data2 = '';
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{ ticks: { stepSize: 5} }], yAxes: [{}] },
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [];

  
  stackBar(){
    this.actionEmail.getActionEmails(this.body)
       .then((data) => {
        let X = data.data[0].x;
        let Y = data.data[0].y
        let text1 = data.data[0].text;
        let text2 = data.data[1].text;
        Object.keys(X).map((X_Index)=>{
          var val = X[X_Index];
          this.X_Array.push(val);
        });
        
        Object.keys(text1).map((text1_Index)=>{
          var val = text1[text1_Index];
          this.text1_array.push(val);
        });

        Object.keys(text2).map((text2_Index)=>{
          var val = text2[text2_Index];
          this.text2_array.push(val);
        });

        this.barChartLabels = this.X_Array;
        this.barChartData   = [{ data: this.text1_array, label: 'External', stack: 'a' },
        { data: this.text2_array, label: 'Internal', stack: 'a', }];

    }).catch((err) => {
       console.log('catch');
    });
  }


  //stacked bar//

  //heatmap
  @ViewChild("chart") chart: ChartComponent;
  public chartHeatOptions: Partial<ChartHeatOptions>;

:  // lineChart
  public lineChartData: Array<any> = [
    {
      data: [65, 59, 80, 81, 56, 55, 40], 
      label: 'Series A'
    },
    // {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    // {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  public lineChartLabels: Array<any> = ['2020-Augest', '2020-September', '2020-October', '2020-November', '2020-December'];
  // public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  public lineChartOptions: any = {
    animation: false,
    responsive: true,
    scales: {
      xAxes: [{

      }],
      yAxes: [{
        
        
      }],
    },
  };
  public lineChartColours: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    //scaleShowHorizontalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['2020-Augest', '2020-September', '2020-October', '2020-November', '2020-December'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    {
      data: [65, 59, 80, 81, 56, 55, 40],
      label: 'External',
      backgroundColor: '#435eab',
      borderColor: '#435eab',
      hoverBackgroundColor:'#435eab',
      barThickness: 15,
  
    },
    { 
      data: [28, 48, 40, 19, 86, 27, 90],
      label: 'Internal',
      backgroundColor: '#435eeb',
      borderColor: '#435eeb',
      hoverBackgroundColor:'#435eeb',
      barThickness: 20,
    
  },
    
  ];

  // // Doughnut
  // public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  // public doughnutChartData: number[] = [350, 450, 100];
  // public doughnutChartType = 'doughnut';

  // // Radar
  // public radarChartLabels: string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

  // public radarChartData: any = [
  //   {data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A'},
  //   {data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B'}
  // ];
  // public radarChartType = 'radar';

  // // Pie
  // public pieChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  // public pieChartData: number[] = [300, 500, 100];
  // public pieChartType = 'pie';

  // // PolarArea
  // public polarAreaChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
  // public polarAreaChartData: number[] = [300, 500, 100, 40, 120];
  // public polarAreaLegend = true;

  // public polarAreaChartType = 'polarArea';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  //heatmap
  ngOnInit(){
    this.stackBar();
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

  // lineChart2
  public lineChart2Data: Array<any> = [
    {
      data: [74, 81, 99, 10, 74, 71,85,78,35,61,63,18,17, 11],
      // label: 'Series A'
    }
  ];
  public lineChart2Labels: Array<any> = ['July-19', 'August-02', 'August-16', 'August-30', 'September-13', 'September-13', 'October-11','October-25','November-08','November-22'];
  public lineChart2Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    // maintainAspectRatio: false,
    scales: {
      xAxes: [{
        // gridLines: {
        //   color: 'transparent',
        //   zeroLineColor: 'transparent'
        // },
        // ticks: {
        //   fontSize: 2,
        //   fontColor: 'transparent',
        // }

      }],
      yAxes: [{
        
        //display: false,
        //ticks: {
          //display: false,
          //min: 1 - 5,
          //max: 34 + 5,
       // }
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
  public lineChart2Colours: Array<any> = [
    { // grey
      // backgroundColor: getStyle('--info'),
      //  borderColor: 'rgba(255,255,255,.55)'
        borderColor: 'rgba(7, 11, 230,.55)'
    }
  ];
  public lineChart2Legend = false;
  public lineChart2Type = 'line';

  // barChart Escalated
  public barChartEscalatedOptions: any = {
    scaleShowVerticalLines: false,
    //scaleShowHorizontalLines: false,
    responsive: true,
    scales: {
      xAxes: [{
      }],
      yAxes: [{
            scaleLabel : {
              display : true,
              labelString : "Number of Emails",
              //fontStyle : 'bold',
              fontSize : 11
            }
        
        //display: false,
        //ticks: {
          //display: false,
          //min: 1 - 5,
          //max: 34 + 5,
       // }
      }],
    },

  };
  public barChartEscalatedLabels: string[] = ['please send', 'soon possible', 'not received', 'received mentioned', 'send-soon','not intended','original message','business day','csv not','within one','one business'];
  public barChartEscalatedType = 'bar';
  public barChartEscalatedLegend = true;

  public barChartEscalatedData: any[] = [
    {
      data: [65, 59, 80, 81, 56, 55, 40,45,57,78],
      label: 'External',
      backgroundColor: '#435eab',
      borderColor: '#435eab',
      hoverBackgroundColor:'#435eab',
      barThickness: 15,
  
    },
    { 
      data: [28, 48, 40, 19, 86, 27, 90],
      label: 'Internal',
      backgroundColor: '#435eeb',
      borderColor: '#435eeb',
      hoverBackgroundColor:'#435eeb',
      barThickness: 20,
    
  },    
  ];

  


}
