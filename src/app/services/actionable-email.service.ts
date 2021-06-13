import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { CommonURL }  from './commonurl';

@Injectable({
  providedIn: 'root'
})

export class ActionableEmailService {
  
  constructor(private http: HttpClient) { }
  emails_data = {
    "success": true,
    "message": "Success",
    "data": [
      {
        "x": {
          "0": "2020-07-20",
          "1": "2020-07-27",
          "2": "2020-08-03",
          "3": "2020-08-10",
          "4": "2020-08-17",
          "5": "2020-08-24",
          "6": "2020-08-31",
          "7": "2020-09-07",
          "8": "2020-09-14",
          "9": "2020-09-21",
          "10": "2020-09-28",
          "11": "2020-10-05",
          "12": "2020-10-12",
          "13": "2020-10-19",
          "14": "2020-10-26",
          "15": "2020-11-02",
          "16": "2020-11-09",
          "17": "2020-11-16",
          "18": "2020-11-23",
        },
        "y": {
          "0": 2123,
          "1": 2522,
          "2": 2859,
          "3": 3044,
          "4": 2696,
          "5": 2255,
          "6": 418,
          "7": 1306,
          "8": 882,
          "9": 1403,
          "10": 1224,
          "11": 1328,
          "12": 1862,
          "13": 1922,
          "14": 2786,
          "15": 2364,
          "16": 270,
          "17": 1414,
          "18": 344
        },
        "text": {
          "0": 66.26,
          "1": 65.93,
          "2": 66.4,
          "3": 66.4,
          "4": 64.3,
          "5": 63.06,
          "6": 59.71,
          "7": 67.04,
          "8": 62.51,
          "9": 63.89,
          "10": 61.76,
          "11": 64.06,
          "12": 67.41,
          "13": 64.76,
          "14": 63.2,
          "15": 61.95,
          "16": 54,
          "17": 61.48,
          "18": 71.67
        },
        "name": "External",
        "marker": null
      },
      {
        "x": {
          "0": "2020-07-20",
          "1": "2020-07-27",
          "2": "2020-08-03",
          "3": "2020-08-10",
          "4": "2020-08-17",
          "5": "2020-08-24",
          "6": "2020-08-31",
          "7": "2020-09-07",
          "8": "2020-09-14",
          "9": "2020-09-21",
          "10": "2020-09-28",
          "11": "2020-10-05",
          "12": "2020-10-12",
          "13": "2020-10-19",
          "14": "2020-10-26",
          "15": "2020-11-02",
          "16": "2020-11-09",
          "17": "2020-11-16",
          "18": "2020-11-23"
        },
        "y": {
          "0": 1081,
          "1": 1303,
          "2": 1447,
          "3": 1540,
          "4": 1497,
          "5": 1321,
          "6": 282,
          "7": 642,
          "8": 529,
          "9": 793,
          "10": 758,
          "11": 745,
          "12": 900,
          "13": 1046,
          "14": 1622,
          "15": 1452,
          "16": 230,
          "17": 886,
          "18": 136
        },
        "text": {
          "0": 33.74,
          "1": 34.07,
          "2": 33.6,
          "3": 33.6,
          "4": 35.7,
          "5": 36.94,
          "6": 40.29,
          "7": 32.96,
          "8": 37.49,
          "9": 36.11,
          "10": 38.24,
          "11": 35.94,
          "12": 32.59,
          "13": 35.24,
          "14": 36.8,
          "15": 38.05,
          "16": 46,
          "17": 38.52,
          "18": 28.33
        },
        "name": "Internal",
        "marker": {
          "color": "rgb(55, 83, 109)"
        }
      }
    ],
    "total": 2,
    "status_code": 200
  }


  getUserEmails(dt):any {
      return new Promise((resolve, reject) => {
          this.http.post(CommonURL.useremail, dt)
              .subscribe(
                  (data) => {
                      resolve(data);
                  },
                  (error) => {
                      console.log(error);
                      reject(error);
              });
      });
  }

  getActionEmailCount(dt):any {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return new Promise((resolve, reject) => {
      this.http.post(CommonURL.actionEmailCount,dt, { headers, responseType: 'text'})
          .subscribe(
              (data) => {
                  resolve(data);
              },
              (error) => {
                  console.log(error);
                  reject(error);
          });
      });
  }
  
  getEmailsTable(dt):any {
    return new Promise((resolve, reject) => {
        this.http.post(CommonURL.actionEmailTable, dt)
            .subscribe(
                (data) => {
                    resolve(data);
                    //resolve(this.emails_data);
                },
                (error) => {
                    console.log(error);
                    reject(error);
            });
    });
  }

  userWorkload(dt):any {
    return new Promise((resolve, reject) => {
      this.http.post(CommonURL.userWorkload, dt)
          .subscribe(
              (data) => {
                  resolve(data);
              },
              (error) => {
                  console.log(error);
                  reject(error);
          });
      });
  }
}
