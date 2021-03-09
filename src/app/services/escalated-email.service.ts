import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonURL }  from './commonurl';

@Injectable({
  providedIn: 'root'
})
export class EscalatedEmailService {

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
    return new Promise((resolve, reject) => {
      this.http.post(CommonURL.escalatedEmailCount, dt)
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
