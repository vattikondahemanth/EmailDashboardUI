import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonURL }  from './commonurl';

@Injectable({
  providedIn: 'root'
})
export class ActionableEmailService {
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

  getUserEmails(dt):any {
      return new Promise((resolve, reject) => {
          this.http.post(CommonURL.useremail, dt)
              .subscribe(
                  (data) => {
                    console.log(data);
                      resolve(data);
                  },
                  (error) => {
                      console.log(error);
                      reject(error);
              });
      });
  }

  getActionEmailCount(dt):any {
    return new Promise((resolve, reject) => {
      this.http.post(CommonURL.actionEmailCount, dt)
          .subscribe(
              (data) => {
                console.log(data);
                  resolve(this.val);
              },
              (error) => {
                  console.log(error);
                  reject(error);
          });
      });
  }
}
