import { TemperatureComponent } from '../temperature/temperature.component';
import { AltitudeComponent } from '../altitude/altitude.component';
import { DataService } from '../../services/data/data.service';
import { AudienceListener } from '../../interfaces/audience';
import { Component, ViewChild, OnInit } from '@angular/core';
import { Audience } from '../../types/audience';
import { TimestampListener } from 'src/interfaces/timestamp';
import { MapComponent } from '../map/map.component';
import { ImageComponent } from '../image/image.component';
import { ClockComponent } from '../clock/clock.component';

@Component({
  selector: 'app-grid-container',
  templateUrl: './grid-container.component.html',
  styleUrls: ['./grid-container.component.scss']
})
export class GridContainerComponent implements OnInit, AudienceListener, TimestampListener {
  
  // Children
  @ViewChild(TemperatureComponent, undefined) temperatureComponent : TemperatureComponent;
  @ViewChild(AltitudeComponent, undefined) altitudeComponent : AltitudeComponent;
  @ViewChild(ImageComponent, undefined) imageComponent : ImageComponent;
  @ViewChild(ClockComponent, undefined) clockComponent : ClockComponent;
  @ViewChild(MapComponent, undefined) mapComponent : MapComponent;

  // Interface
  public onAudienceChange(audience: Audience) {
    this.temperatureComponent.onAudienceChange(audience);
    this.altitudeComponent.onAudienceChange(audience);
    this.imageComponent.onAudienceChange(audience);
  }

  public onTimeStampChange(timestamp: number) {
    this.temperatureComponent.onTimeStampChange(timestamp);
    this.altitudeComponent.onTimeStampChange(timestamp);
    this.imageComponent.onTimeStampChange(timestamp);
    this.clockComponent.onTimeStampChange(timestamp);
  }

  ngOnInit() {
    this.mapComponent.OnTimestampChanged((x) => this.onTimeStampChange(x));
  }

  // Constructor
  constructor(private locationService: DataService) {}

  // Location service
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
