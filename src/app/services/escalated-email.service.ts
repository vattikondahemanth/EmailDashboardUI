import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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


}
