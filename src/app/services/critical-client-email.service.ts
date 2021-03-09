import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonURL }  from './commonurl';

@Injectable({
  providedIn: 'root'
})

export class CriticalClientEmailService {
  constructor(private http: HttpClient) { }
  val = {
    "success": true,
    "message": "Success",
    "data": [
      {
        "total_received": "12 K",
        "response_time": "40",
        "total_responses": "2 K min"
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
    return new Promise((resolve, reject) => {
      this.http.post(CommonURL.criticalEmailCount, dt)
          .subscribe(
              (data) => {
                resolve(this.val);
              },
              (error) => {
                  console.log(error);
                  reject(error);
      });
    });
  }
}
