import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonURL }  from './commonurl';

@Injectable({
  providedIn: 'root'
})
export class EscalatedEmailService {

  constructor(private http: HttpClient) { }

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


}
