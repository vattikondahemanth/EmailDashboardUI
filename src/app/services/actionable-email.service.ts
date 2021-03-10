import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonURL }  from './commonurl';

@Injectable({
  providedIn: 'root'
})
export class ActionableEmailService {
  constructor(private http: HttpClient) { }

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
    return new Promise((resolve, reject) => {
      this.http.post(CommonURL.actionEmailCount, dt)
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
