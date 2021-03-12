import { Component, VERSION ,ViewChild,OnInit } from '@angular/core';
import { InsightsService } from '../../services/insights.service';
import { DatePipe } from '@angular/common';

import {ChartComponent,
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexChart,
  ApexPlotOptions
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
};

@Component({
  templateUrl: 'insights.component.html',
  providers: [DatePipe]
})
export class InsightsComponent {
  start_date :any  = new Date();
  year             = this.start_date.getFullYear();
  month            = this.start_date.getMonth();
  day              = this.start_date.getDate();
  end_date :any    = new Date(this.year - 1, this.month, this.day);
  frequency        = 'W-MON';

  constructor(
    public insights:InsightsService,
    public datePipe: DatePipe){
    this.start_date  = this.datePipe.transform(this.start_date ,'yyyy-MM-dd');
    this.end_date    = this.datePipe.transform(this.end_date ,'yyyy-MM-dd');
  }
  //heatmap
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;


  //******************PIE CHART 1 START**********************//
  // For percentage show use like below
  //https://stackoverflow.com/questions/52044013/chartjs-datalabels-show-percentage-value-in-pie-piece
  // https://jsfiddle.net/a1Lvn4eb/55/
  public pieChartLabels: any[] = [];
  public pieChartData: any[] = [];
  public pieChartType = 'pie';
  public pieChartColors = [{
      backgroundColor: ['rgba(30, 105, 148,0.8)', 'rgba(242, 110, 10,0.8)'],
    }];
  
  getUserEmail(){
    let Labels_Array = [];
    let Values_Array = [];
    let body = {
      "filters": {
        "start_date": this.start_date+"T00:00:00.000000",
        "end_date":   this.end_date+"T00:00:00.000000",
        "frequency":  this.frequency,
      }
    }; 

    this.insights.getUserEmail(body)
    .then((data) => {
      let Labels = "";
      let Values = "";

      if (data.data[0].hasOwnProperty("labels")){
         Labels = data.data[0].labels;
      }

      if (data.data[0].hasOwnProperty("values")){
          Values = data.data[0].values;
      }

      Object.keys(Labels).map((Label_Index)=>{
          var val = Labels[Label_Index];
          Labels_Array.push(val);
      });

      Object.keys(Values).map((Values_Index)=>{
          var val = Values[Values_Index];
          Values_Array.push(val);
      });

      this.pieChartLabels = Labels_Array;
      this.pieChartData   = Values_Array;

     }).catch((err) => {
        console.log('catch');
     });
  }
//************************PIE CHART 1 END*********************//


//******************PIE CHART 2 START**********************//
    public pieChartChaserLabels: any[] = [];
    public pieChartChaserData: any[] = [];
    public pieChartChaserType = 'pie';
    public pieChartChaserColors = [
      {
        backgroundColor: ['rgba(30, 105, 148,0.8)', 'rgba(242, 110, 10,0.8)'],
      },
    ];

    getChaserEmail(){
      let Labels_Array = [];
      let Values_Array = [];
      let body = {
        "filters": {
          "start_date": this.start_date+"T00:00:00.000000",
          "end_date":   this.end_date+"T00:00:00.000000",
          "frequency":  this.frequency,
        }
      }; 
  
      this.insights.getChaserEmail(body)
      .then((data) => {
        let Labels = "";
        let Values = "";
  
        if (data.data[0].hasOwnProperty("labels")){
           Labels = data.data[0].labels;
        }
  
        if (data.data[0].hasOwnProperty("values")){
            Values = data.data[0].values;
        }
  
        Object.keys(Labels).map((Label_Index)=>{
            var val = Labels[Label_Index];
            Labels_Array.push(val);
        });
  
        Object.keys(Values).map((Values_Index)=>{
            var val = Values[Values_Index];
            Values_Array.push(val);
        });
  
        this.pieChartChaserLabels = Labels_Array;
        this.pieChartChaserData   = Values_Array;
  
       }).catch((err) => {
          console.log('catch');
       });
    }
//************************PIE CHART 2 END*********************//

//***********************BAR CHART START******************************/

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend:{
      display:false
    },
    scales: {
      xAxes: [{
          gridLines: {
              // color: "rgba(0, 0, 0, 0)",
              display: false,
          }
      }],
      yAxes: [{
          gridLines: {
              // color: "rgba(0, 0, 0, 0)",
              // display: false,
          }, 
          ticks: {
            beginAtZero: true, 
         }   
      }]
    }
  };
  public barChartLabels: any[] = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData: any[] = [];

  getEmailByUser(){
    let X_Array = [];
    let Y_Array = [];
    let X = "";
    let Y = "";
    let body = {
      "filters": {
        "start_date": this.start_date+"T00:00:00.000000",
        "end_date":   this.end_date+"T00:00:00.000000",
        "frequency":  this.frequency,
      }
    }; 

    this.insights.getEmailByUser(body)
    .then((data) => {

      if (data.data[0].hasOwnProperty("x")){
         X = data.data[0].x;
      }

      if (data.data[0].hasOwnProperty("y")){
          Y = data.data[0].y;
      }
      console.log(data);

      Object.keys(X).map((X_Index)=>{
          var val = X[X_Index];
          X_Array.push(val);
      });

      Object.keys(Y).map((Y_Index)=>{
          var val = Y[Y_Index];
          Y_Array.push(val);
      });

      this.barChartLabels = X_Array;
      this.barChartData   = [{
        data: Y_Array,
        label: 'Series A',
        backgroundColor: '#202945',
        borderColor: '#202945',
        hoverBackgroundColor:'#202945',
     }];
    });
  }
//***********************BAR CHART END******************************/

//*************************BAR CHART DAY START***********************/
  public barChartDayOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend:{
      display:false
    },
    hover: {
      "animationDuration": 0
    },
    animation: {
      "duration": 1,
      "onComplete": function() {
            let chartInstance = this.chart,
              ctx = chartInstance.ctx;
              // referance link below
              //https://bramantox.wordpress.com/2019/10/06/how-to-show-values-on-top-of-bars-in-chart-js/
            //ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
            // ctx.fillStyle = 'white';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'bottom';

              this.data.datasets.forEach(function(dataset, i) {
                let meta = chartInstance.controller.getDatasetMeta(i);
                meta.data.forEach(function(bar, index) {
                  let data = dataset.data[index];
                  ctx.fillText(data, bar._model.x, bar._model.y - 5);
                });
              });
      }
    },
    scales: {
      xAxes: [{
          gridLines: {
              color: "rgba(0, 0, 0, 0)",
          },
          ticks:{
            
          }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true, 
       }   
    }]
    }
  };
  public barChartDayLabels: any[] = [];
  public barChartDayType = 'bar';
  public barChartDayLegend = true;
  public barChartDayData: any[] = []
  
  getVolumeDay(){
      let X_Array = [];
      let Y_Array = [];
      let X = "";
      let Y = "";
      let body = {
        "filters": {
          "start_date": this.start_date+"T00:00:00.000000",
          "end_date":   this.end_date+"T00:00:00.000000",
          "frequency":  this.frequency,
        }
      }; 

      this.insights.getVolumeDay(body)
      .then((data) => {

        if (data.data[0].hasOwnProperty("x")){
          X = data.data[0].x;
        }

        if (data.data[0].hasOwnProperty("y")){
            Y = data.data[0].y;
        }
        console.log(data);

        Object.keys(X).map((X_Index)=>{
            var val = X[X_Index];
            X_Array.push(val);
        });

        Object.keys(Y).map((Y_Index)=>{
            var val = Y[Y_Index];
            Y_Array.push(val);
        });

        this.barChartDayLabels = X_Array;
        this.barChartDayData   = [{
          data: Y_Array,
          label: 'Series A',
          backgroundColor: '#364c8f',
          borderColor: '#364c8f',
          hoverBackgroundColor:'#364c8f',
        }];
      });
  }

//*************************BAR CHART DAY END*************************/


  // // lineChart
  // public lineChartData: Array<any> = []; 
  // public lineChartLabels: Array<any> = [];
  // public lineChartOptions: any = {
  //   animation: false,
  //   responsive: true
  // };

  // public lineChartColours: Array<any> = [
  //   { // grey
  //     backgroundColor: 'rgba(148,159,177,0.2)',
  //     borderColor: 'rgba(148,159,177,1)',
  //     pointBackgroundColor: 'rgba(148,159,177,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  //   },
  //   { // dark grey
  //     backgroundColor: 'rgba(77,83,96,0.2)',
  //     borderColor: 'rgba(77,83,96,1)',
  //     pointBackgroundColor: 'rgba(77,83,96,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(77,83,96,1)'
  //   },
  //   { // grey
  //     backgroundColor: 'rgba(148,159,177,0.2)',
  //     borderColor: 'rgba(148,159,177,1)',
  //     pointBackgroundColor: 'rgba(148,159,177,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  //   }
  // ];
  // public lineChartLegend = true;
  // public lineChartType = 'line';

    //horizontal bar
    public horizontalBarChartOptions: any = {
      scaleShowVerticalLines: false,
      responsive: true,
      legend:{
        display:false
      },
      hover: {
        "animationDuration": 0
      },
      animation: { //animation code is for numbers show only
        "duration": 1,
        "onComplete": function() {
              let chartInstance = this.chart,
                ctx = chartInstance.ctx;
              // referance link below
              //https://bramantox.wordpress.com/2019/10/06/how-to-show-values-on-top-of-bars-in-chart-js/
              //ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
              ctx.fillStyle = 'white';
              ctx.textAlign = 'right';
              ctx.textBaseline = 'top';
              this.data.datasets.forEach(function(dataset, i) {
                  let meta = chartInstance.controller.getDatasetMeta(i);
                  meta.data.forEach(function(bar, index) {
                    let data = dataset.data[index];
                    ctx.fillText(data, bar._model.x, bar._model.y - 5);
                  });
              });
        }
      },
      scales: {
          xAxes: [{
               ticks: {
                  beginAtZero: true, 
              },
              
          }],
          yAxes: [{
              gridLines: {
                  display: false
              },
              
          }]
      },
      

    };
    //public barChartLabels: string[] = ['2005', '2007', '2008', '2009', '2010', '2011', '2012'];
    public horizontalBarChartLabels: string[] = [];
    public horizontalBarChartType = 'horizontalBar';
    //public horizontalBarChartLegend = true;
    public horizontalBarLabel = 'Number of Emails';
  
    public horizontalBarChartData: any[] = [];


  TopSenders(){
    let X_Array = [];
    let Y_Array = [];
    let X = "";
    let Y = "";
    let body = {
      "filters": {
        "start_date": this.start_date+"T00:00:00.000000",
        "end_date":   this.end_date+"T00:00:00.000000",
        "frequency":  this.frequency,
      }
    }; 

    this.insights.TopSenders(body)
    .then((data) => {
          if (data.data[0].hasOwnProperty("x")){
            X = data.data[0].x;
          }

          if (data.data[0].hasOwnProperty("y")){
              Y = data.data[0].y;
          }

          Object.keys(X).map((X_Index)=>{
              var val = X[X_Index];
              X_Array.push(val);
          });

          Object.keys(Y).map((Y_Index)=>{
              var val = Y[Y_Index];
              Y_Array.push(val);
          });
        
          this.horizontalBarChartData = [
            {
              data: X_Array, 
              backgroundColor: '#435eab',
              borderColor: '#435eab',
              hoverBackgroundColor:'#435eab',
              label: 'Series A',
              barThickness: 20,
              
            }]
          this.horizontalBarChartLabels = Y_Array;
    });
  }










  // Doughnut
  public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: number[] = [350, 450, 100];
  public doughnutChartType = 'doughnut';

  // Radar
  public radarChartLabels: string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

  public radarChartData: any = [
    {data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B'}
  ];
  public radarChartType = 'radar';


  // PolarArea
  public polarAreaChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
  public polarAreaChartData: number[] = [300, 500, 100, 40, 120];
  public polarAreaLegend = true;

  public polarAreaChartType = 'polarArea';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
   
  //heatmap
  ngOnInit(){
    this.getUserEmail();
    this.getChaserEmail();
    this.getEmailByUser();
    this.getVolumeDay();
    this.TopSenders();

    this.chartOptions = {
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
        {
          name: "Jul",
          data: this.generateData(20, {
            min: -30,
            max: 55
          })
        },
        {
          name: "Aug",
          data: this.generateData(20, {
            min: -30,
            max: 55
          })
        },
        {
          name: "Sep",
          data: this.generateData(20, {
            min: -30,
            max: 55
          })
        }
      ],
      chart: {
        height: 350,
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
    while (i < count) {
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










}
