import { Component, VERSION ,ViewChild,OnInit } from '@angular/core';

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
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {
   //heatmap
   @ViewChild("chart") chart: ChartComponent;
   public chartOptions: Partial<ChartOptions>;

  // lineChart
  public lineChartData: Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    // {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    // {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  public lineChartLabels: Array<any> = ['2020-Augest', '2020-September', '2020-October', '2020-November', '2020-December'];
  // public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  public lineChartOptions: any = {
    animation: false,
    responsive: true
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
  //public barChartLabels: string[] = ['2005', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartLabels: string[] = ['2020-Augest', '2020-September', '2020-October', '2020-November', '2020-December'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

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

  // Pie
  public pieChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType = 'pie';

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


}
