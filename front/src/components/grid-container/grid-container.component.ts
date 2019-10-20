import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service.ts/location.service';

@Component({
  selector: 'app-grid-container',
  templateUrl: './grid-container.component.html',
  styleUrls: ['./grid-container.component.scss']
})
export class GridContainerComponent implements OnInit {

  constructor(private locationService: LocationService) { }

  ngOnInit() {
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
  getHardwareTelemetryPacket() {
    this.locationService.getHardwareTelemetryPacket().subscribe(res => {
      console.log('getHardwareTelemetryPacket()', res);
    })
  }
  
  getMinMax() {
    this.locationService.getMinMax().subscribe(res => {
      console.log('min and max data:', res);
    });
  }

  getPhotoData() {
    this.locationService.getPhotoData().subscribe(res => {
      console.log('image data:', res);
    });
  }

  getSoftwareTelemetryPacket() {
    this.locationService.getSoftwareTelemetryPacket().subscribe(res => {
      console.log('getSoftwareTelemetryPacket()', res);
    })
  }


}
