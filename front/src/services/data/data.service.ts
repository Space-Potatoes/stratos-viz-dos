import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Point } from '../../types/point';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  public apiUrl = 'http://134.190.188.170/TIMMINS2018';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<object> {
    return this.http.get(`${this.apiUrl}/NAVEM/swem_event`);
  }

  getFinalData(): Observable<object> {
    return this.http.get(`${this.apiUrl}/final`);
  }

  getFlightEnvironmentData(): Observable<object> {
    return this.http.get(`${this.apiUrl}/NAVEM/swem_em0`);
  }
  
  getGondolaAttitudeAndHeadingData(): Observable<object> {
    return this.http.get(`${this.apiUrl}/NAVEM/swem_ahr0`);
  }
  
  getIOCTLHousekeepingData(): Observable<object> {
    return this.http.get(`${this.apiUrl}/IOCTL/ioctl_hkp`);
  }
  
  getMinMax(): Observable<object> {
    return this.http.get(`${this.apiUrl}/NAVEM/swnav_pos0/min_max`);
  }
  
  getPhotoData(): Observable<object> {
    return this.http.get(`${this.apiUrl}/CDH/HKP/swcdh_events`);
  }
  
  getSWCDHHardwareHousekeepingData(): Observable<object> {
    return this.http.get(`${this.apiUrl}/CDH/HKP/swcdh_hw0`);
  }

  getSWCDHSoftwareHousekeepingData(): Observable<object> {
    return this.http.get(`${this.apiUrl}/CDH/HKP/swcdh_hkp0`);
  }
  
  getSWEMHousekeepingData(): Observable<object> {
    return this.http.get(`${this.apiUrl}/NAVEM/swem_hk`);
  }
  
  // Edited
  getGondolaPositionData(timestamp? : number): Observable<any> {
    let params = new HttpParams();
    if (timestamp) params = params.append('mid', "" + timestamp);
    return this.http.get(`${this.apiUrl}/NAVEM/swnav_pos0`, { params });
  }

  getSWNAVHousekeepingData(timestamp? : number): Observable<any> {
    let params = new HttpParams();
    if (timestamp) params = params.append('mid', "" + timestamp);
    return this.http.get(`${this.apiUrl}/NAVEM/swnav_hkp`, { params });
  }

}
