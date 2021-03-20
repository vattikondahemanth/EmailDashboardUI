import { Component, VERSION ,ViewChild,OnInit } from '@angular/core';
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ActionableEmailService } from '../../services/actionable-email.service';
import { CriticalClientEmailService } from '../../services/critical-client-email.service';
import { EscalatedEmailService } from '../../services/escalated-email.service';
import { DatePipe } from '@angular/common';


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
  styleUrls: ['./dashboard.component.css'],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit {
  // start_date :any  =  new Date();
  // year             = this.start_date.getFullYear();
  // month            = this.start_date.getMonth();
  // day              =   this.start_date.getDate();
  // end_date :any    = new Date(this.year - 1, this.month, this.day);

  end_date :any  =  new Date();
  end_date_n = new Date().toISOString().slice(0,16);
  year             = this.end_date.getFullYear();
  month            = this.end_date.getMonth();
  day              =   this.end_date.getDate();
  start_date :any    = new Date(this.year - 1, this.month, this.day);
  start_date_n = new Date(this.year - 1, this.month, this.day).toISOString().slice(0, 16);

  // constructor( 
  //   public actionEmail:ActionableEmailService,
  //   public criticalEmail:CriticalClientEmailService,
  //   public escalatedEmail:EscalatedEmailService,
  //   public datePipe: DatePipe
  //   ){
  //     this.start_date  = this.datePipe.transform(this.start_date ,'yyyy-MM-dd');
  //     this.end_date     = this.datePipe.transform(this.end_date ,'yyyy-MM-dd');
  //     console.log(this.start_date);
  //     console.log(this.end_date);
  //   }
  constructor( 
    public actionEmail:ActionableEmailService,
    public criticalEmail:CriticalClientEmailService,
    public escalatedEmail:EscalatedEmailService,
    public datePipe: DatePipe
    ){
      this.start_date  = this.datePipe.transform(this.start_date ,'yyyy-MM-dd');
      this.end_date     = this.datePipe.transform(this.end_date ,'yyyy-MM-dd');
      console.log(this.start_date);
      console.log(this.end_date);
    }


// start_date_n = this.start_date
// end_date_n   = this.end_date
action_frequency    = 'W-MON';
critical_frequency  = 'W-MON';
escalated_frequency = 'W-MON';

//Action
actionResponseTime:any  = '';
actionTotalReceived:any = '';
actionTotalResponse:any = '';
actionEmails:any = [];

//Critical
criticalResponseTime:any  = '';
criticalTotalReceived:any = '';
criticalTotalResponse:any = '';
criticalEmails:any = [];

//Escalated
escalatedResponseTime:any  = '';
escalatedTotalReceived:any = '';
escalatedTotalResponse:any = '';
escalatedEmails:any = [];

startDateChange(event){
  this.start_date = event.target.value;
}

endDateChange(event){
  this.end_date = event.target.value;
  this.emailUserStackBar();
  this.emailReceiveBarChart();
  this.emailReceiveLineChart();
  this.emailReceiveBarChartEscalated();
  this.actionEmailCount();
  this.criticalEmailCount();
  this.escalatedEmailCount();
  
}
  

//*****************************************ACTION EMAIL START******************************************************* */
  actionEmailChange(value:any){
    this.action_frequency  = value;
    this.actionEmailCount();
    this.emailUserStackBar();
  }

  actionEmailCount(){
    let body = {
      "filters": {
        "start_date": this.start_date+"T00:00:00.000000",
        "end_date":   this.end_date+"T00:00:00.000000",
        "frequency":  this.action_frequency,
      }
    }; 
    this.actionEmail.getActionEmailCount(body)
    .then((data) => {
      data = data.replace("Total Received",'total_received');
      data = data.replace("Total Responses",'total_responses');
      data = data.replace("Response Time",'response_time');
      data = JSON.parse(data);
       this.actionResponseTime  = data.data[0].response_time
       this.actionTotalReceived = data.data[0].total_received
       this.actionTotalResponse = data.data[0].total_responses

     }).catch((err) => {
        console.log('catch');
     });
  }

barChartOptions: ChartOptions = {
  responsive: true,
  scales: { 
    xAxes: [{ 
       ticks: { stepSize: 5} ,
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
  
  emailUserStackBar(){
    let X_Array = [];
    let Y_Array = [];
    let text1_array = [];
    let text2_array = [];
    let body = {
      "filters": {
        "start_date": this.start_date+"T00:00:00.000000",
        "end_date":   this.end_date+"T00:00:00.000000",
        "frequency":  this.action_frequency,
      }
    }; 
    console.log(body);
    this.actionEmail.getUserEmails(body)
       .then((data) => {
        let X = "";
        let Y = "";
        let text1 = "";
        let text2 = "";
        if (data.data[0].hasOwnProperty("x")){
             X = data.data[0].x;
        }
        if (data.data[0].hasOwnProperty("y")){
             Y = data.data[0].y
        }
        if (data.data[0].hasOwnProperty("text")){
            text1 = data.data[0].text;
        }
        if (data.data[1].hasOwnProperty("text")){
            text2 = data.data[1].text;
        }

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

  getEmailsTable(){
    let body = {
      "filters": {
        "start_date": this.start_date+"T00:00:00.000000",
        "end_date":   this.end_date+"T00:00:00.000000",
        "frequency":  this.action_frequency,
      }
    }; 
  
    this.actionEmail.getEmailsTable(body)
       .then((data) => {
          data = data.data[0];
          var val =  data['DateTime_Received'];
           Object.keys(val).map((val_Index)=>{
             this.actionEmails.push({
               'DateTime_Received':data['DateTime_Received'][val_Index],
               'Sender_Name'      :data['Sender_Name'][val_Index],
               'Subject'          :data['Subject'][val_Index],
               'To'               :data['To'][val_Index],
               'Cc'               :data['Cc'][val_Index]
              })
           })
    });
  }

//STACK BAR END//
//*****************************************ACTION EMAIL END******************************************************* */






//*****************************************CRITICAL EMAIL START******************************************************* */

//BAR CHART Critical START//
criticalEmailChange(value:any){
  this.critical_frequency  = value;
  this.emailReceiveBarChart();
  this.emailReceiveLineChart();
  this.criticalEmailCount();
}

criticalEmailCount(){
  let body = {
    "filters": {
      "start_date": this.start_date+"T00:00:00.000000",
      "end_date":   this.end_date+"T00:00:00.000000",
      "frequency":  this.critical_frequency,
    }
  }; 
  this.criticalEmail.criticalEmailCount(body)
  .then((data) => {
      console.log(data);
      data = data.replace("Total Received",'total_received');
      data = data.replace("Total Responses",'total_responses');
      data = data.replace("Response Time",'response_time');
      data = JSON.parse(data);
     this.criticalResponseTime  = data.data[0].response_time
     this.criticalTotalReceived = data.data[0].total_received
     this.criticalTotalResponse = data.data[0].total_responses

   }).catch((err) => {
      console.log('catch');
   });
}

barChartCriticalOptions: any = {
  scaleShowVerticalLines: false,
  responsive: true,
  scales: {
    xAxes: [{
      gridLines: {
        display: false,
      },
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

  barChartCriticalLabels: any[] = [];
  public barChartCriticalType = 'bar';
  public barChartCriticalLegend = true;
  public barChartCriticalData: any[] = [];

  emailReceiveBarChart(){
    let X_Array = [];
    let Y_Array = [];
    let text1_array = [];
    let text2_array = [];
   
    let body = {
      "filters": {
        "start_date": this.start_date+"T00:00:00.000000",
        "end_date":   this.end_date+"T00:00:00.000000",
        "frequency":  this.critical_frequency,
      }
    }; 

    this.criticalEmail.getEmailCount(body)
    .then((data) => {
      let X = "";
      let Y = "";
      let text1 = "";
      let text2 = "";
      if (data.data[0].hasOwnProperty("x")){
           X = data.data[0].x;
      }
      if (data.data[0].hasOwnProperty("y")){
           Y = data.data[0].y
      }
      if (data.data[0].hasOwnProperty("text")){
          text1 = data.data[0].text;
      }
      if (data.data[1].hasOwnProperty("text")){
        text2 = data.data[1].text;
      }

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

     this.barChartCriticalLabels = X_Array;
     this.barChartCriticalData = [{
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
        "start_date": this.start_date+"T00:00:00.000000",
        "end_date":   this.end_date+"T00:00:00.000000",
        "frequency":  this.critical_frequency,
      }
    };

    this.criticalEmail.getEmailResponse(body)
    .then((data) => {
      let X = "";
      let Y = "";
      if (data.data[0].hasOwnProperty("x")){
           X = data.data[0].x;
      }
      if (data.data[0].hasOwnProperty("y")){
           Y = data.data[0].y
      }

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

  getActionEmailsTable(){
    let body = {
      "filters": {
        "start_date": this.start_date+"T00:00:00.000000",
        "end_date":   this.end_date+"T00:00:00.000000",
        "frequency":  this.action_frequency,
      }
    }; 
  
    this.criticalEmail.getActionEmailsTable(body)
       .then((data) => {
          data = data.data[0];
          var val =  data['DateTime_Received'];
           Object.keys(val).map((val_Index)=>{
             this.criticalEmails.push({
               'DateTime_Received':data['DateTime_Received'][val_Index],
               'Sender_Name'      :data['Sender_Name'][val_Index],
               'Subject'          :data['Subject'][val_Index],
               'To'               :data['To'][val_Index],
               'Cc'               :data['Cc'][val_Index]
              })
           })
           console.log(this.criticalEmails);
    });
  }
  //LINE CHART END//

//*****************************************CRITICAL EMAIL END******************************************************* */

//*****************************************ESCALATED EMAIL START********************************************************* */
escalatedEmailChange(value:any){
  this.escalated_frequency  = value;
  this.emailReceiveBarChartEscalated();
  this.escalatedEmailCount();
}

escalatedEmailCount(){
  let body = {
    "filters": {
      "start_date": this.start_date+"T00:00:00.000000",
      "end_date":   this.end_date+"T00:00:00.000000",
      "frequency":  this.escalated_frequency,
    }
  }; 
  this.escalatedEmail.escalatedEmailCount(body)
  .then((data) => {
      data = data.replace("Total Received",'total_received');
      data = data.replace("Total Responses",'total_responses');
      data = data.replace("Response Time",'response_time');
      data = JSON.parse(data);
     this.escalatedResponseTime  = data.data[0].response_time
     this.escalatedTotalReceived = data.data[0].total_received
     this.escalatedTotalResponse = data.data[0].total_responses

   }).catch((err) => {
      console.log('catch');
   });
}
//BAR CHART ESCALATED START//
barChartEscalatedOptions: any = {
  scaleShowVerticalLines: false,
  responsive: true,
  legend:{
    display:false
  },
  scales: {
    xAxes: [{
      scaleLabel : {
        display : true,
        labelString : "Top Keywords in Chasers",
        fontSize : 11,
      },
      gridLines: {
        display: false,
      },
    }],
    yAxes: [{
          scaleLabel : {
            display : true,
            labelString : "Number of Emails",
            fontSize : 11
          },
          
    }],
  },
};

barChartEscalatedLabels: any[] = [];
public barChartEscalatedType = 'bar';
public barChartEscalatedLegend = true;
public barChartEscalatedData: any[] = [];

emailReceiveBarChartEscalated(){
  let X_Array = [];
  let Y_Array = [];
  let text1_array = [];
  let text2_array = [];
  this.barChartEscalatedLabels = [];
  let body = {
    "filters": {
      "start_date": this.start_date+"T00:00:00.000000",
      "end_date":   this.end_date+"T00:00:00.000000",
      "frequency":  this.escalated_frequency,
    }
  }; 

  this.escalatedEmail.getEscalatedKeywords(body)
  .then((data) => {
    console.log(data);
    
    let X = "";
    let Y = "";
    if (data.data[0].data[0].hasOwnProperty("x")){
         X = data.data[0].data[0].x;
    }
    if (data.data[0].data[0].hasOwnProperty("y")){
         Y = data.data[0].data[0].y
    }
  
    let text1 = "";
    if (data.data[0].hasOwnProperty("text")){
        text1 = data.data[0].data[0].text;
    }

    let text2 = Y;
     
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
   this.barChartEscalatedData = [
    //  {
    //   data: text1_array,
    //   // label: 'Received',
    //   backgroundColor: '#435eeb',
    //   borderColor: '#435eeb',
    //   hoverBackgroundColor:'#435eeb',
    //   barThickness: 15,
  
    // },
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


//*****************************************ESCALATED EMAIL END********************************************************* */

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
    this.emailReceiveBarChartEscalated();
    this.actionEmailCount();
    this.criticalEmailCount();
    this.escalatedEmailCount();
    this.getEmailsTable();
    this.getActionEmailsTable();
    this.getEscalatedEmailsTable();
    
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
        enabled: true
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

getEscalatedEmailsTable(){
  let body = {
    "filters": {
      "start_date": this.start_date+"T00:00:00.000000",
      "end_date":   this.end_date+"T00:00:00.000000",
      "frequency":  this.action_frequency,
    }
  }; 

  this.escalatedEmail.getEscalatedEmailsTable(body)
     .then((data) => {
        data = data.data[0];
        var val =  data['DateTime_Received'];
         Object.keys(val).map((val_Index)=>{
           this.escalatedEmails.push({
             'DateTime_Received':data['DateTime_Received'][val_Index],
             'Sender_Name'      :data['Sender_Name'][val_Index],
             'Subject'          :data['Subject'][val_Index],
             'To'               :data['To'][val_Index],
             'Cc'               :data['Cc'][val_Index]
            })
         })
         console.log(this.escalatedEmails);
  });
}



}
