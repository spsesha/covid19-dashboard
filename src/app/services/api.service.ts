import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  countriesSummary: any[] = [];
  isSummaryLoaded: boolean = false;
  asOnDate: Date = undefined;

  constructor(
    private http: HttpClient
  ) { }

  getSummary(): Observable<any> {
    return this.http.get('https://api.covid19api.com/summary');
  }

  getLiveData(country: string, status: string): Observable<any> {
    return this.http.get(`https://api.covid19api.com/total/country/${country}/status/${status}`);
    // return this.http.get(`https://api.covid19api.com/dayone/country/${country}/status/${status}/live`);
  }

  getCurrentData(country: string, status: string): Observable<any> {
    let todayData = new Date();
    todayData.setDate(todayData.getDate() - 1);
    let date = todayData.toISOString().substr(0, 10) + "T23:59:59Z";
    return this.http.get(`https://api.covid19api.com/live/country/${country}/status/${status}/date/${date}`);
  }

}
