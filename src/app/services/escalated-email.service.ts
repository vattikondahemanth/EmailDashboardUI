import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonURL }  from './commonurl';

@Injectable({
  providedIn: 'root'
})
export class EscalatedEmailService {

  constructor(private http: HttpClient) { }
  emails_data = 
  {
    "success": true,
    "message": "Success",
    "data": [
      {
        "DateTime_Received": {
          "16": "2020-07-14 14:52:04",
          "30": "2020-07-14 15:01:44",
          "32": "2020-07-14 15:04:17",
          "50": "2020-07-14 15:13:14"
        },
        "Sender_Name": {
          "16": "connectivity@arcesium.com",
          "30": "Nguyen, Hai",
          "32": "connectivity@arcesium.com",
          "50": "Mateusz Glowacz"
        },
        "Subject": {
          "16": "Connectivity#68196: CSGRP file delayed | Fri Jul 10 00:00:00 UTC 2020",
          "30": "RE: Catamaran CLO 2013-1:  Carestream Health Inc  *****6th Attempt*****",
          "32": "Connectivity#68196: CSGRP file delayed | Fri Jul 10 00:00:00 UTC 2020",
          "50": "RE: Credit Suisse International - Midland National Life Collateral Statements"
        },
        "To": {
          "16": "connectivity@arcesium.com",
          "30": "americas.collateralmgt@credit-suisse.com",
          "32": "connectivity@arcesium.com",
          "50": "americas.collateralmgt@credit-suisse.com; FRM_OPS@milliman.com"
        },
        "Cc": {
          "16": "",
          "30": "graves.ganzert@credit-suisse.com; elizabeth.small@credit-suisse.com; justin.lewis@credit-suisse.com; Abdul.PM@bnymellon.com",
          "32": "",
          "50": "DHedging@sfgmembers.com"
        }
      }
    ],
    "total": 1,
    "status_code": 200
  }
  
  


  getEscalatedKeywords(dt):any {
    return new Promise((resolve, reject) => {
        this.http.post(CommonURL.escalatedKeywords, dt)
            .subscribe(
                (data) => {
                    resolve(data);
                },
                (error) => {
                    reject(error);
            });
    });
  }

  escalatedEmailCount(dt):any{
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return new Promise((resolve, reject) => {
      this.http.post(CommonURL.escalatedEmailCount, dt, { headers, responseType: 'text'})
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

  getEscalatedEmailsTable(dt):any {
    return new Promise((resolve, reject) => {
        this.http.post(CommonURL.escalatedEmailTable, dt)
            .subscribe(
                (data) => {
                    //resolve(data);
                    resolve(this.emails_data);
                },
                (error) => {
                    console.log(error);
                    reject(error);
            });
    });
  }


}
