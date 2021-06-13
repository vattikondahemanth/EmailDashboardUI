import { Component, VERSION ,ViewChild,OnInit } from '@angular/core';
import { InsightsService } from '../../services/insights.service';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import { ChartOptions, ChartType, Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

Chart.plugins.register(ChartDataLabels);
import {ChartComponent,
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexChart,
  ApexPlotOptions
} from "ng-apexcharts";

export type ChartOptionsHeat = {
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
  end_date: any = new Date();
  end_date_n = new Date().toISOString().slice(0, 16);
  year = this.end_date.getFullYear();
  month = this.end_date.getMonth();
  day = this.end_date.getDate();
  start_date: any = new Date(this.year - 1, this.month, this.day);
  start_date_n = new Date(this.year - 1, this.month, this.day).toISOString().slice(0, 16);
  frequency        = 'W-MON';

  constructor(
    public insights:InsightsService,
    private SpinnerService: NgxSpinnerService,
    public datePipe: DatePipe,
    public decimalPipe: DecimalPipe,
    private route: ActivatedRoute
    ){
    this.start_date  = this.datePipe.transform(this.start_date ,'yyyy-MM-dd');
    this.end_date    = this.datePipe.transform(this.end_date ,'yyyy-MM-dd');
    console.log(this.start_date);
    console.log(this.end_date);
  }



  //******************PIE CHART 1 START**********************//
  pieChart1:any[] = [];
  format = '2.0-2';
  public pieChartLabels: any[] = [];
  public pieChartData: any[] = [];
  public pieChartType = 'pie';
  public pieChartColors = [{
      backgroundColor: ['rgba(30, 105, 148,0.8)', 'rgba(242, 110, 10,0.8)'],
    }];
  public pieChartOptions: ChartOptions = {
      responsive: true,
      legend: {
        position: 'top',
      },
      tooltips: {
        enabled: true,
        mode: 'single'
      },
      plugins: { 
        labels: {
          render: 'percentage',
          precision: 2,
          arc: true,
        },
        datalabels: {
         color: "white",
         formatter: (value, ctx) => {
            var perc = value+ "%";
            return perc;
         },
        },
       },
    };

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
      this.getPercentage1(Values_Array);
      this.pieChartData   = this.pieChart1;

     }).catch((err) => {
        console.log('catch');
     });
  }

  getPercentage1(dataArr){
    let total = 0;
    let pVal:any = 0;
    for(let val of dataArr){
      total += val;
    }
    for(let valP of dataArr){
       pVal = (valP * 100)/total;
       pVal = this.decimalPipe.transform(pVal, this.format);
       this.pieChart1.push(pVal);
    }
   
    console.log(this.pieChart1);
  }
//************************PIE CHART 1 END*********************//


//******************PIE CHART 2 START**********************//
    public pieChart2:any[] = []
    public pieChartChaserLabels: any[] = [];
    public pieChartChaserData: any[] = [];
    public pieChartChaserType = 'pie';
    public pieChartOptions2: ChartOptions = {
      responsive: true,
      legend: {
        position: 'top',
      },
      tooltips: {
        enabled: true,
        mode: 'single'
      },
      plugins: {
        datalabels: {
          color: "white",
          formatter: (value, ctx) => {
             var perc = value+ "%";
             return perc;
          },
         },
       },
    };
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
        this.getPercentage2(Values_Array);
        this.pieChartChaserData = this.pieChart2;
  
       }).catch((err) => {
          console.log('catch');
       });
    }

    getPercentage2(dataArr){
      let total = 0;
      let pVal:any = 0;
      for(let val of dataArr){
        total += val;
      }
      for(let valP of dataArr){
         pVal = (valP * 100)/total;
         pVal = this.decimalPipe.transform(pVal, this.format);
         this.pieChart2.push(pVal);
      }
    }
//************************PIE CHART 2 END*********************//

//***********************BAR CHART START******************************/

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend:{
      display:false
    },
    plugins: {
      datalabels: {
        display: false
      }
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
      plugins: {
        datalabels: {
          display: false
        }
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
      plugins: {
        datalabels: {
          display: false
        }
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

    public horizontalBarChartLabels: string[] = [];
    public horizontalBarChartType = 'horizontalBar';
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

  //heatmap
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptionsHeat>;

  peakHours(){
  let X_Array = [];
  let Y_Array = [];
  let Z_Array = [];
  let X = "";
  let Y = "";
  let Z = "";
  let body = {
    "filters": {
      "start_date": this.start_date+"T00:00:00.000000",
      "end_date":   this.end_date+"T00:00:00.000000",
      "frequency":  this.frequency,
    }
  }; 

  this.insights.peakHours(body)
  .then((data) => {
        if (data.data[0].hasOwnProperty("x")){
          X = data.data[0].x;
        }

        if (data.data[0].hasOwnProperty("y")){
            Y = data.data[0].y;
        }

        if (data.data[0].hasOwnProperty("z")){
            Z = data.data[0].z;
        }

        Object.keys(X).map((X_Index)=>{
            var val = X[X_Index];
            X_Array.push(val);
        });

        Object.keys(Y).map((Y_Index)=>{
            var val = Y[Y_Index];
            Y_Array.push(val);
        });

        Object.keys(Z).map((Z_Index)=>{
            var val = Z[Z_Index];
            Z_Array.push(val);
        });

        let Series:any = [];
        for(let index in Y_Array){
           var series_val = {
                name: Y_Array[index],
                data: this.generateData(index,X_Array,Z_Array),
              }
          Series.push(series_val);
        }

         this.chartOptions = { 
          series: Series,
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
                    from: 0,
                    to: 200,
                    name: "0-200",
                    color: "#7ef293"
                  },
                  {
                    from: 200,
                    to: 400,
                    name: "200-400",
                    color: "#64f57f"
                  },
                  {
                    from: 400,
                    to: 600,
                    name: "400-600",
                    color: "#51db6a"
                  },
                  {
                    from: 600,
                    to: 800,
                    name: "600-800",
                    color: "#33d651"
                  },              {
                  from: 800,
                    to: 1200,
                    name: "800-1200",
                    color: "#00d427"
                  }
                ]
              }
            }
          },
          dataLabels: {
            enabled: true,
            style: {
              colors: ["#000"]
            }    
          }
        }; 
      });
  }

  public generateData(index,X_Array:any,Z_Array:any){
      var series_data = [];
      for(let key in Z_Array[index]){
          series_data.push({
              x: X_Array[key],
              y: Z_Array[index][key]
          });
      }
    return series_data;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
   
 

  ngOnInit(){
    console.log(this.route.snapshot.params.profile);

    this.SpinnerService.show();
    this.getUserEmail();
    this.getChaserEmail();
    this.getEmailByUser();
    this.getVolumeDay();
    this.TopSenders();
    this.peakHours();
    setTimeout(() => {
      this.SpinnerService.hide();
    }, 3000);
  }
}
