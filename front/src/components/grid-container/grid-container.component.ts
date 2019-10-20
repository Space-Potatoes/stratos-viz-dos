import { TemperatureComponent } from '../temperature/temperature.component';
import { LocationService } from '../../services/location/location.service';
import { AltitudeComponent } from '../altitude/altitude.component';
import { AudienceListener } from '../../interfaces/audience';
import { Component, ViewChild } from '@angular/core';
import { Audience } from '../../types/audience';

@Component({
  selector: 'app-grid-container',
  templateUrl: './grid-container.component.html',
  styleUrls: ['./grid-container.component.scss']
})
export class GridContainerComponent implements AudienceListener {
  
  // Children
  @ViewChild(TemperatureComponent, undefined) temperatureComponent : TemperatureComponent;
  @ViewChild(AltitudeComponent, undefined) altitudeComponent : AltitudeComponent;

  // Interface
  public onAudienceChange(audience: Audience) {
    this.temperatureComponent.onAudienceChange(audience);
    this.altitudeComponent.onAudienceChange(audience);
  }

  // Constructor
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

}
