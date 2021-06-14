import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonURL }  from './commonurl';

@Injectable({
  providedIn: 'root'
})
export class InsightsService {
  constructor(private http: HttpClient) { }
  getUserEmail(dt):any {
    return new Promise((resolve, reject) => {
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
