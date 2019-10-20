import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  public apiUrl = 'http://134.190.188.170/TIMMINS2018';

  constructor(private http: HttpClient) { }

  getFlightEnvironmentData(): Observable<object> {
    return this.http.get(`${this.apiUrl}/NAVEM/swem_em0`);
  }

  getGondolaAttitudeAndHeadingData(): Observable<object> {
    return this.http.get(`${this.apiUrl}/NAVEM/swem_ahr0`);
  }

  getGondolaPositionData(): Observable<object> {
    return this.http.get(`${this.apiUrl}/NAVEM/swnav_pos0`);
  }

  getHardwareTelemetryPacket(): Observable<object> {
    return this.http.get(`${this.apiUrl}/CDH/HKP/swcdh_hw0`);
  }
  
  getMinMax(): Observable<object> {
    return this.http.get(`${this.apiUrl}/NAVEM/swnav_pos0/min_max`);
  }

  getPhotoData(): Observable<object> {
    return this.http.get(`${this.apiUrl}/CDH/HKP/swcdh_events`);
  }

  getSoftwareTelemetryPacket(): Observable<object> {
    return this.http.get(`${this.apiUrl}/CDH/HKP/swcdh_hkp0`);
  }

}
