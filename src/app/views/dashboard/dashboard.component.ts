import { Component, VERSION, ViewChild, OnInit, AfterContentInit } from '@angular/core';
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ActionableEmailService } from '../../services/actionable-email.service';
import { CriticalClientEmailService } from '../../services/critical-client-email.service';
import { EscalatedEmailService } from '../../services/escalated-email.service';
import { DatePipe } from '@angular/common';
import { from } from 'rxjs';
import { IDatasource, IGetRowsParams, GridOptions, GridApi } from 'ag-grid-community';
import { NgxSpinnerService } from "ngx-spinner";


import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexChart,
  ApexPlotOptions
} from "ng-apexcharts";


export type ChartHeatOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
};

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit, AfterContentInit {
  end_date: any = new Date();
  end_date_n = new Date().toISOString().slice(0, 16);
  year = this.end_date.getFullYear();
  month = this.end_date.getMonth();
  day = this.end_date.getDate();
  start_date: any = new Date(this.year - 1, this.month, this.day);
  start_date_n = new Date(this.year - 1, this.month, this.day).toISOString().slice(0, 16);
  escalatedEmailsList: any = [];

  constructor(
    public actionEmail: ActionableEmailService,
    public criticalEmail: CriticalClientEmailService,
    public escalatedEmail: EscalatedEmailService,
    public datePipe: DatePipe,
    private SpinnerService: NgxSpinnerService
  ) {
    this.start_date = this.datePipe.transform(this.start_date, 'yyyy-MM-dd');
    this.end_date = this.datePipe.transform(this.end_date, 'yyyy-MM-dd');
  }

  action_frequency = 'W-MON';
  critical_frequency = 'W-MON';
  escalated_frequency = 'W-MON';

  //Action
  actionResponseTime: any = '';
  actionTotalReceived: any = '';
  actionTotalResponse: any = '';
  actionEmails: Array<any> = [];
  Series: any = [];

  //Critical
  criticalResponseTime: any = '';
  criticalTotalReceived: any = '';
  criticalTotalResponse: any = '';
  criticalEmails: any = [];

  //Escalated
  escalatedResponseTime: any = '';
  escalatedTotalReceived: any = '';
  escalatedTotalResponse: any = '';
  escalatedEmails: any = [];


  startDateChange(event) {
    this.start_date = event.target.value;
  }

  endDateChange(event) {
    this.end_date = event.target.value;
  }

  dateFilter(){
    this.emailUserStackBar();
    this.userWorkload();
    this.actionEmailCount();
    this.emailReceiveBarChart();
    this.emailReceiveLineChart();
    this.emailReceiveBarChartEscalated();
    this.criticalEmailCount();
    this.escalatedEmailCount();
    this.escalatedUserWorkload();
  }


  //*****************************************ACTION EMAIL START******************************************************* */
  actionEmailChange(value: any) {
    this.action_frequency = value;
    this.actionEmailCount();
    this.emailUserStackBar();
    this.userWorkload();
  }

  actionEmailCount() {
    let body = {
      "filters": {
        "start_date": this.start_date + "T00:00:00.000000",
        "end_date": this.end_date + "T00:00:00.000000",
        "frequency": this.action_frequency,
      }
    };
    this.actionEmail.getActionEmailCount(body)
      .then((data) => {
        data = data.replace("Total Received", 'total_received');
        data = data.replace("Total Responses", 'total_responses');
        data = data.replace("Response Time", 'response_time');
        data = JSON.parse(data);
        this.actionResponseTime = data.data[0].response_time
        this.actionTotalReceived = data.data[0].total_received
        this.actionTotalResponse = data.data[0].total_responses

      }).catch((err) => {
        //console.log('catch');
      });
  }

  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      datalabels: {
        display: false
      }
    },
    scales: {
      xAxes: [{
        ticks: { stepSize: 5 },
        gridLines: {
          display: false,
        },
      }],
      yAxes: [{}]
    },
  };


  //STACK BAR START//
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [];

  emailUserStackBar() {
    let X_Array = [];
    let Y_Array = [];
    let text1_array = [];
    let text2_array = [];
    let body = {
      "filters": {
        "start_date": this.start_date + "T00:00:00.000000",
        "end_date": this.end_date + "T00:00:00.000000",
        "frequency": this.action_frequency,
      }
    };

    this.actionEmail.getUserEmails(body)
      .then((data) => {
        let X = "";
        let Y = "";
        let text1 = "";
        let text2 = "";
        if (data.data[0].hasOwnProperty("x")) {
          X = data.data[0].x;
        }
        if (data.data[0].hasOwnProperty("y")) {
          Y = data.data[0].y
        }
        if (data.data[0].hasOwnProperty("text")) {
          text1 = data.data[0].text;
        }
        if (data.data[1].hasOwnProperty("text")) {
          text2 = data.data[1].text;
        }

        Object.keys(X).map((X_Index) => {
          var val = X[X_Index];
          X_Array.push(val);
        });

        Object.keys(text1).map((text1_Index) => {
          var val = text1[text1_Index];
          text1_array.push(val);
        });

        Object.keys(text2).map((text2_Index) => {
          var val = text2[text2_Index];
          text2_array.push(val);
        });

        this.barChartLabels = X_Array;
        this.barChartData = [{
          data: text1_array, label: 'External',
          stack: 'a', backgroundColor: '#435eab',
          borderColor: '#435eab',
          hoverBackgroundColor: '#435eab',
          barThickness: 20,
        },
        {
          data: text2_array,
          label: 'Internal',
          stack: 'a',
          backgroundColor: '#435eeb',
          borderColor: '#435eeb',
          hoverBackgroundColor: '#435eeb',
          barThickness: 20,
        }];

      }).catch((err) => {
        //console.log('catch');
      });
  }

  getEmailsTable() {
    let body = {
      "filters": {
        "start_date": this.start_date + "T00:00:00.000000",
        "end_date": this.end_date + "T00:00:00.000000",
        "frequency": this.action_frequency,
      }
    };

    this.actionEmail.getEmailsTable(body)
      .then((data) => {
        data = data.data[0];
        var val = data['DateTime_Received'];
        Object.keys(val).map((val_Index) => {
          this.actionEmails.push({
            'DateTime_Received': data['DateTime_Received'][val_Index],
            'Sender_Name': data['Sender_Name'][val_Index],
            'Subject': data['Subject'][val_Index],
            'To': data['To'][val_Index],
            'Cc': data['Cc'][val_Index]
          })
        })
      });
  }

  //heatmap
  @ViewChild("chart") chart: ChartComponent;
  public chartHeatOptions: Partial<ChartHeatOptions>;

  userWorkload() {
    let X_Array = [];
    let Y_Array = [];
    let Z_Array = [];
    let X = "";
    let Y = "";
    let Z = "";
    let body = {
      "filters": {
        "start_date": this.start_date + "T00:00:00.000000",
        "end_date": this.end_date + "T00:00:00.000000",
        "frequency": this.action_frequency,
      }
    };

    this.actionEmail.userWorkload(body)
      .then((data) => {
        if (data.data[0].hasOwnProperty("x")) {
          X = data.data[0].x;
        }

        if (data.data[0].hasOwnProperty("y")) {
          Y = data.data[0].y;
        }

        if (data.data[0].hasOwnProperty("z")) {
          Z = data.data[0].z;
        }

        Object.keys(X).map((X_Index) => {
          var val = X[X_Index];
          X_Array.push(val);
        });

        Object.keys(Y).map((Y_Index) => {
          var val = Y[Y_Index];
          Y_Array.push(val);
        });

        Object.keys(Z).map((Z_Index) => {
          var val = Z[Z_Index];
          Z_Array.push(val);
        });

        let Series: any = [];
        for (let index in Y_Array) {
          var series_val = {
            name: Y_Array[index],
            data: this.generateData(index, X_Array, Z_Array),
          }
          Series.push(series_val);
        }

        this.chartHeatOptions = {
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
                  }, {
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

  public generateData(index, X_Array: any, Z_Array: any) {
    var series_data = [];
    for (let key in Z_Array[index]) {
      series_data.push({
        x: X_Array[key],
        y: Z_Array[index][key]
      });
    }
    return series_data;
  }

  //STACK BAR END//
  //*****************************************ACTION EMAIL END******************************************************* */






  //*****************************************CRITICAL EMAIL START******************************************************* */

  //BAR CHART Critical START//
  criticalEmailChange(value: any) {
    this.critical_frequency = value;
    this.emailReceiveBarChart();
    this.emailReceiveLineChart();
    this.criticalEmailCount();
  }

  criticalEmailCount() {
    let body = {
      "filters": {
        "start_date": this.start_date + "T00:00:00.000000",
        "end_date": this.end_date + "T00:00:00.000000",
        "frequency": this.critical_frequency,
      }
    };
    this.criticalEmail.criticalEmailCount(body)
      .then((data) => {
        data = data.replace("Total Received", 'total_received');
        data = data.replace("Total Responses", 'total_responses');
        data = data.replace("Response Time", 'response_time');
        data = JSON.parse(data);
        this.criticalResponseTime = data.data[0].response_time
        this.criticalTotalReceived = data.data[0].total_received
        this.criticalTotalResponse = data.data[0].total_responses

      }).catch((err) => {
        //console.log('catch');
      });
  }

  barChartCriticalOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    plugins: {
      datalabels: {
        display: false
      }
    },
    scales: {
      xAxes: [{
        gridLines: {
          display: false,
        },
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: "Number of Emails",
          fontSize: 11
        }
      }],
    },
  };

  barChartCriticalLabels: any[] = [];
  public barChartCriticalType = 'bar';
  public barChartCriticalLegend = true;
  public barChartCriticalData: any[] = [];

  emailReceiveBarChart() {
    let X_Array = [];
    let Y_Array = [];
    let text1_array = [];
    let text2_array = [];

    let body = {
      "filters": {
        "start_date": this.start_date + "T00:00:00.000000",
        "end_date": this.end_date + "T00:00:00.000000",
        "frequency": this.critical_frequency,
      }
    };

    this.criticalEmail.getEmailCount(body)
      .then((data) => {
        let X = "";
        let Y = "";
        let text1 = "";
        let text2 = "";
        if (data.data[0].hasOwnProperty("x")) {
          X = data.data[0].x;
        }
        if (data.data[0].hasOwnProperty("y")) {
          Y = data.data[0].y
        }
        if (data.data[0].hasOwnProperty("text")) {
          text1 = data.data[0].text;
        }
        if (data.data[1].hasOwnProperty("text")) {
          text2 = data.data[1].text;
        }

        Object.keys(X).map((X_Index) => {
          var val = X[X_Index];
          X_Array.push(val);
        });

        Object.keys(text1).map((text1_Index) => {
          var val = text1[text1_Index];
          text1_array.push(val);
        });

        Object.keys(text2).map((text2_Index) => {
          var val = text2[text2_Index];
          text2_array.push(val);
        });

        this.barChartCriticalLabels = X_Array;
        this.barChartCriticalData = [{
          data: text1_array,
          label: 'Received',
          backgroundColor: '#435eeb',
          borderColor: '#435eeb',
          hoverBackgroundColor: '#435eeb',
          barThickness: 15,

        },
        {
          data: text2_array,
          label: 'Responded',
          backgroundColor: '#435eab',
          borderColor: '#435eab',
          hoverBackgroundColor: '#435eab',
          barThickness: 15,
        }]
      });
  }
  //BAR CHART Critical END//

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
    plugins: {
      datalabels: {
        display: false
      }
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

  emailReceiveLineChart() {
    let X_Array = [];
    let Y_Array = [];
    let body = {
      "filters": {
        "start_date": this.start_date + "T00:00:00.000000",
        "end_date": this.end_date + "T00:00:00.000000",
        "frequency": this.critical_frequency,
      }
    };

    this.criticalEmail.getEmailResponse(body)
      .then((data) => {
        let X = "";
        let Y = "";
        if (data.data[0].hasOwnProperty("x")) {
          X = data.data[0].x;
        }
        if (data.data[0].hasOwnProperty("y")) {
          Y = data.data[0].y
        }

        Object.keys(X).map((X_Index) => {
          var val = X[X_Index];
          X_Array.push(val);
        });

        Object.keys(Y).map((Y_Index) => {
          var val = Y[Y_Index];
          Y_Array.push(val);
        });

        this.lineChart2Labels = X_Array;
        this.lineChart2Data = [{
          data: Y_Array
        }];
      });
  }

  getActionEmailsTable() {
    let body = {
      "filters": {
        "start_date": this.start_date + "T00:00:00.000000",
        "end_date": this.end_date + "T00:00:00.000000",
        "frequency": this.action_frequency,
      }
    };

    this.criticalEmail.getActionEmailsTable(body)
      .then((data) => {
        data = data.data[0];
        var val = data['DateTime_Received'];
        Object.keys(val).map((val_Index) => {
          this.criticalEmails.push({
            'DateTime_Received': data['DateTime_Received'][val_Index],
            'Sender_Name': data['Sender_Name'][val_Index],
            'Subject': data['Subject'][val_Index],
            'To': data['To'][val_Index],
            'Cc': data['Cc'][val_Index]
          })
        })
      });
  }
  //LINE CHART END//

  //*****************************************CRITICAL EMAIL END******************************************************* */

  //*****************************************ESCALATED EMAIL START********************************************************* */
  escalatedEmailChange(value: any) {
    this.escalated_frequency = value;
    this.emailReceiveBarChartEscalated();
    this.escalatedEmailCount();
    this.escalatedUserWorkload();
  }

  escalatedEmailCount() {
    let body = {
      "filters": {
        "start_date": this.start_date + "T00:00:00.000000",
        "end_date": this.end_date + "T00:00:00.000000",
        "frequency": this.escalated_frequency,
      }
    };
    this.escalatedEmail.escalatedEmailCount(body)
      .then((data) => {
        data = data.replace("Total Received", 'total_received');
        data = data.replace("Total Responses", 'total_responses');
        data = data.replace("Response Time", 'response_time');
        data = JSON.parse(data);
        this.escalatedResponseTime = data.data[0].response_time
        this.escalatedTotalReceived = data.data[0].total_received
        this.escalatedTotalResponse = data.data[0].total_responses

      }).catch((err) => {
        //console.log('catch');
      });
  }
  //BAR CHART ESCALATED START//
  barChartEscalatedOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {
      display: false
    },
    plugins: {
      datalabels: {
        display: false
      }
    },
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: "Top Keywords in Chasers",
          fontSize: 11,
        },
        gridLines: {
          display: false,
        },
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: "Number of Emails",
          fontSize: 11
        },

      }],
    },
  };

  barChartEscalatedLabels: any[] = [];
  public barChartEscalatedType = 'bar';
  public barChartEscalatedLegend = true;
  public barChartEscalatedData: any[] = [];

  emailReceiveBarChartEscalated() {
    let X_Array = [];
    let Y_Array = [];
    let text1_array = [];
    let text2_array = [];
    this.barChartEscalatedLabels = [];
    let body = {
      "filters": {
        "start_date": this.start_date + "T00:00:00.000000",
        "end_date": this.end_date + "T00:00:00.000000",
        "frequency": this.escalated_frequency,
      }
    };

    this.escalatedEmail.getEscalatedKeywords(body)
      .then((data) => {

        let X = "";
        let Y = "";
        if (data.data[0].data[0].hasOwnProperty("x")) {
          X = data.data[0].data[0].x;
        }
        if (data.data[0].data[0].hasOwnProperty("y")) {
          Y = data.data[0].data[0].y
        }

        let text1 = "";
        if (data.data[0].hasOwnProperty("text")) {
          text1 = data.data[0].data[0].text;
        }

        let text2 = Y;

        Object.keys(X).map((X_Index) => {
          var val = X[X_Index];
          X_Array.push(val);
        });

        Object.keys(text1).map((text1_Index) => {
          var val = text1[text1_Index];
          text1_array.push(val);
        });

        Object.keys(text2).map((text2_Index) => {
          var val = text2[text2_Index];
          text2_array.push(val);
        });

        this.barChartEscalatedLabels = X_Array;
        this.barChartEscalatedData = [{
          data: text2_array,
          label: 'Responded',
          backgroundColor: '#435eab',
          borderColor: '#435eab',
          hoverBackgroundColor: '#435eab',
          barThickness: 15,

        }]
      });
  }

  //heatmap
  public chartHeatOptions2: Partial<ChartHeatOptions>;

  escalatedUserWorkload() {
    let X_Array = [];
    let Y_Array = [];
    let Z_Array = [];
    let X = "";
    let Y = "";
    let Z = "";
    let body = {
      "filters": {
        "start_date": this.start_date + "T00:00:00.000000",
        "end_date": this.end_date + "T00:00:00.000000",
        "frequency": this.action_frequency,
      }
    };

    this.escalatedEmail.escalatedUserWorkload(body)
      .then((data) => {
        if (data.data[0].hasOwnProperty("x")) {
          X = data.data[0].x;
        }

        if (data.data[0].hasOwnProperty("y")) {
          Y = data.data[0].y;
        }

        if (data.data[0].hasOwnProperty("z")) {
          Z = data.data[0].z;
        }

        Object.keys(X).map((X_Index) => {
          var val = X[X_Index];
          val = val.replace("T00:00:00.000000000",'');    
          X_Array.push(val);
        });

        Object.keys(Y).map((Y_Index) => {
          var val = Y[Y_Index];
          Y_Array.push(val);
        });

        Object.keys(Z).map((Z_Index) => {
          var val = Z[Z_Index];
          Z_Array.push(val);
        });

        let Series: any = [];
        for (let index in Y_Array) {
          var series_val = {
            name: Y_Array[index],
            data: this.generateData(index, X_Array, Z_Array),
          }
          Series.push(series_val);
        }

        this.chartHeatOptions2 = {
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
                  }, {
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
  //BAR CHART ESCALATED END//

  //HEATMAP END//
  escalatedEmailsListTotalItems = 10;
  escalatedEmailsListCurrentPage:any =1;
  setPage(pageNo: any): void {
    this.escalatedEmailsListCurrentPage = pageNo.page;
    this.getEscalatedEmailsTable();
  }
  getEscalatedEmailsTable() {
    this.escalatedEmailsList = [];
    let body = {
      "filters": {
        "start_date": this.start_date + "T00:00:00.000000",
        "end_date": this.end_date + "T00:00:00.000000",
        "frequency": this.action_frequency,
        "page_size": 10,
        "page_num": this.escalatedEmailsListCurrentPage
      }
    };
    this.escalatedEmail.getEscalatedEmailsTable(body)
      .then((data) => {
        this.escalatedEmailsListTotalItems =  data.data[0].Total_Records;
        data = data.data[0];
        var val = data['DateTime_Received'];
        Object.keys(val).map((val_Index) => {
          this.escalatedEmailsList.push({
            'DateTime_Received': data['DateTime_Received'][val_Index],
            'Sender_Name': data['Sender_Name'][val_Index],
            'Subject': data['Subject'][val_Index],
            'To': data['To'][val_Index],
            'Cc': data['Cc'][val_Index]
          })
        })
      });
  }
  
  criticalEmailsList =[];
  criticalEmailsListTotalItems = 10;
  criticalEmailsListCurrentPage:any =1;
  setPageCriticalEmailsList(pageNo: any): void {
    this.criticalEmailsListCurrentPage = pageNo.page;
    this.getCriticalEmailssTable();
  }
  getCriticalEmailssTable() {
    this.criticalEmailsList = [];
    let body = {
      "filters": {
        "start_date": this.start_date + "T00:00:00.000000",
        "end_date": this.end_date + "T00:00:00.000000",
        "frequency": this.action_frequency,
        "page_size": 10,
        "page_num": this.criticalEmailsListCurrentPage
      }
    };
    this.escalatedEmail.getCriticalEmailsTable(body)
      .then((data) => {
        this.criticalEmailsListTotalItems =  data.data[0].Total_Records;
        data = data.data[0];
        var val = data['DateTime_Received'];
        Object.keys(val).map((val_Index) => {
          this.criticalEmailsList.push({
            'DateTime_Received': data['DateTime_Received'][val_Index],
            'Sender_Name': data['Sender_Name'][val_Index],
            'Subject': data['Subject'][val_Index],
            'To': data['To'][val_Index],
            'Cc': data['Cc'][val_Index]
          })
        })
      });
  }

  actionEmailList =[];
  actionEmailListTotalItems = 10;
  actionEmailListCurrentPage:any =1;
  setPageActionEmailList(pageNo: any): void {
    this.actionEmailListCurrentPage = pageNo.page;
    this.getActionEmailTable();
  }
  getActionEmailTable() {
    this.actionEmailList = [];
    let body = {
      "filters": {
        "start_date": this.start_date + "T00:00:00.000000",
        "end_date": this.end_date + "T00:00:00.000000",
        "frequency": this.action_frequency,
        "page_size": 10,
        "page_num": this.actionEmailListCurrentPage
      }
    };
    this.escalatedEmail.getActionEmailTable(body)
      .then((data) => {
        this.actionEmailListTotalItems =  data.data[0].Total_Records;
        data = data.data[0];
        var val = data['DateTime_Received'];
        Object.keys(val).map((val_Index) => {
          this.actionEmailList.push({
            'DateTime_Received': data['DateTime_Received'][val_Index],
            'Sender_Name': data['Sender_Name'][val_Index],
            'Subject': data['Subject'][val_Index],
            'To': data['To'][val_Index],
            'Cc': data['Cc'][val_Index]
          })
        })
      });
  }
  //*****************************************ESCALATED EMAIL END********************************************************* */

  // events
  public chartClicked(e: any): void {
    //console.log(e);
  }

  public chartHovered(e: any): void {
    //console.log(e);
  }
  bindData($bindData) {
    console.log($bindData)
  }
  columnDefs = [
    { headerName: 'DateTime Received', field: 'DateTime_Received' },
    { headerName: 'Sender Name', field: 'Sender_Name' },
    { headerName: 'Subject', field: 'Subject' },
    { headerName: 'To', field: 'To' },
    { headerName: 'Cc', field: 'Cc' },
  ];

  ngAfterContentInit() {
    this.SpinnerService.show();
    this.emailUserStackBar();
    this.userWorkload();
    this.actionEmailCount();
    this.emailReceiveBarChart();
    this.emailReceiveLineChart();
    this.emailReceiveBarChartEscalated();
    this.criticalEmailCount();
    this.escalatedEmailCount();
    this.getEmailsTable();
    this.getActionEmailsTable();
    this.getEscalatedEmailsTable();
    this.getCriticalEmailssTable();
    this.getActionEmailTable();
    this.escalatedUserWorkload();
    setTimeout(() => {
      this.SpinnerService.hide();
    }, 3000);

  }
  //HEATMAP STARTED//
  ngOnInit() {

  }
  
}
