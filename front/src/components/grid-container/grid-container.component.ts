import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location/location.service';

@Component({
  selector: 'app-grid-container',
  templateUrl: './grid-container.component.html',
  styleUrls: ['./grid-container.component.scss']
})
export class GridContainerComponent implements OnInit {

  constructor(private locationService: LocationService) { }

  ngOnInit() {
  }

  getEvents() {
    this.locationService.getEvents().subscribe(res => {
      console.log('getEvents()', res);
    })
  }
  getFlightEnvironmentData() {
    this.locationService.getFlightEnvironmentData().subscribe(res => {
      console.log('getFlightEnvironmentData()', res);
    })
  }
  getGondolaAttitudeAndHeadingData() {
    this.locationService.getGondolaAttitudeAndHeadingData().subscribe(res => {
      console.log('getGondolaAttitudeAndHeadingData()', res);
    })
  }
  getGondolaPositionData() {
    this.locationService.getGondolaPositionData().subscribe(res => {
      console.log('getGondolaPositionData()', res);
    })
  }
  getMinMax() {
    this.locationService.getMinMax().subscribe(res => {
      console.log('getMinMax()', res);
    })
  }
  getPhotoData() {
    this.locationService.getPhotoData().subscribe(res => {
      console.log('getPhotoData()', res);
    })
  }
  getSWCDHHardwareHousekeepingData() {
    this.locationService.getSWCDHHardwareHousekeepingData().subscribe(res => {
      console.log('getSWCDHHardwareHousekeepingData()', res);
    })
  }
  getSWCDHSoftwareHousekeepingData() {
    this.locationService.getSWCDHSoftwareHousekeepingData().subscribe(res => {
      console.log('getSWCDHSoftwareHousekeepingData()', res);
    })
  }
  getSWEMHousekeepingData() {
    this.locationService.getSWEMHousekeepingData().subscribe(res => {
      console.log('getSWEMHousekeepingData()', res);
    })
  }
  getSWNAVHousekeepingData() {
    this.locationService.getSWNAVHousekeepingData().subscribe(res => {
      console.log('getSWNAVHousekeepingData()', res);
    })
  }
  getIOCTLHousekeepingData() {
    this.locationService.getIOCTLHousekeepingData().subscribe(res => {
      console.log('getIOCTLHousekeepingData()', res);
    })
  }

  getFinalData() {
    this.locationService.getFinalData().subscribe(res => {
      console.log('getFinalData', res);
    })
  }

}
