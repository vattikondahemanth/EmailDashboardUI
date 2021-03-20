import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonURL }  from './commonurl';

@Injectable({
  providedIn: 'root'
})

export class CriticalClientEmailService {
  constructor(private http: HttpClient) { }
  emails_data = {
    "success": true,
    "message": "Success",
    "data": [
      {
        "DateTime_Received": {
          "12099": "2020-08-04 16:14:55",
          "21738": "2020-08-19 16:53:55"
        },
        "Sender_Name": {
          "12099": "OPS Derivatives Coll",
          "21738": "Mateusz Glowacz"
        },
        "Subject": {
          "12099": "Sandbox: RE: Credit Suisse International - Interest Statements Cal Pers CSA    [ ref:_00D19FZ4t._500",
          "21738": "*Willodean please confirm* RE: Credit Suisse International - Midland National Life Collateral Statem"
        },
        "To": {
          "12099": "americas.collateralmgt@credit-suisse.com",
          "21738": "americas.collateralmgt@credit-suisse.com; FRM_OPS@milliman.com; elizabeth.small@credit-suisse.com"
        },
        "Cc": {
          "12099": "",
          "21738": ""
        },
        "is_responded": {
          "12099": true,
          "21738": true
        },
        "response_time_in_minutes": {
          "12099": 96.08,
          "21738": 19.42
        }
      }
    ],
    "total": 1,
    "status_code": 200
  }
  

  getEmailCount(dt):any {
    return new Promise((resolve, reject) => {
        this.http.post(CommonURL.emailCount, dt)
            .subscribe(
                (data) => {
                    resolve(data);
                },
                (error) => {
                    reject(error);
            });
    });
  }

  getEmailResponse(dt):any{
    return new Promise((resolve, reject) => {
      this.http.post(CommonURL.emailResponse, dt)
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

  criticalEmailCount(dt):any{
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return new Promise((resolve, reject) => {
      this.http.post(CommonURL.criticalEmailCount, dt , { headers, responseType: 'text'})
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

  getActionEmailsTable(dt):any {
    return new Promise((resolve, reject) => {
        this.http.post(CommonURL.criticalEmailTable, dt)
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
