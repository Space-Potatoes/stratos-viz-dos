import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public apiUrl = 'http://134.190.188.170/TIMMINS2018';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<object> {
    return this.http.get(`${this.apiUrl}/NAVEM/swem_event`).pipe(x => {
      console.log(x);
      return x;
    });
  }

  getFlightEnvironmentData(): Observable<object> {
    return this.http.get(`${this.apiUrl}/NAVEM/swem_em0`);
  }
  
  getGondolaAttitudeAndHeadingData(): Observable<object> {
    return this.http.get(`${this.apiUrl}/NAVEM/swem_ahr0`);
  }
  
  getGondolaPositionData(): Observable<object> {
    return this.http.get(`${this.apiUrl}/NAVEM/swnav_pos0`);
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
    return this.http.get(`${this.apiUrl}/CDH/HKP/swem_hk`);
  }
  
  getSWNAVHousekeepingData(): Observable<object> {
    return this.http.get(`${this.apiUrl}/NAVEM/swnav_hkp`);
  }

}
