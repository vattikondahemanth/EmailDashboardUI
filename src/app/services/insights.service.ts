import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonURL }  from './commonurl';

@Injectable({
  providedIn: 'root'
})
export class InsightsService {
  constructor(private http: HttpClient) { }
  email_data = {
    "success": true,
    "message": "Success",
    "data": [
      {
        "title": "Emails directed to users",
        "barmode": "relative",
        "hovermode": "closest",
        "labels": [
          "Internal",
          "External"
        ],
        "values": [
          6286,
          4180
        ],
        "hoverinfo": "label+value",
        "textinfo": "percent"
      }
    ],
    "total": 1,
    "status_code": 200
  }

  getUserEmail(dt):any {
    return new Promise((resolve, reject) => {
      resolve(this.email_data);
      this.http.post(CommonURL.insightsUserEmail, dt)
          .subscribe(
              (data) => {
                  resolve(data);
              },
              (error) => {
                  reject(error);
          });
    });
  }

  getChaserEmail(dt):any {
    return new Promise((resolve, reject) => {
      resolve(this.email_data);
      this.http.post(CommonURL.insightsChaserEmail, dt)
          .subscribe(
              (data) => {
                  resolve(data);
              },
              (error) => {
                  reject(error);
          });
    });
  }

  getEmailByUser(dt):any {
    return new Promise((resolve, reject) => {
      this.http.post(CommonURL.insightsEmailByUser, dt)
          .subscribe(
              (data) => {
                  resolve(data);
              },
              (error) => {
                  reject(error);
          });
    });
  }

  getVolumeDay(dt):any {
    return new Promise((resolve, reject) => {
      this.http.post(CommonURL.insightsVolumeDay, dt)
          .subscribe(
              (data) => {
                  resolve(data);
              },
              (error) => {
                  reject(error);
          });
    });
  }

  TopSenders(dt):any {
    return new Promise((resolve, reject) => {
      this.http.post(CommonURL.insightsTopSenders, dt)
          .subscribe(
              (data) => {
                  resolve(data);
              },
              (error) => {
                  reject(error);
          });
    });
  }

  peakHours(dt):any{
    return new Promise((resolve, reject) => {
      this.http.post(CommonURL.insightsPeakHours, dt)
          .subscribe(
              (data) => {
                  resolve(data);
              },
              (error) => {
                  reject(error);
          });
    });
  }


}
