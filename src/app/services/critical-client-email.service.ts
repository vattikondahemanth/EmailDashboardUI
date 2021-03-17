import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonURL }  from './commonurl';

@Injectable({
  providedIn: 'root'
})

export class CriticalClientEmailService {
  constructor(private http: HttpClient) { }

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
}
