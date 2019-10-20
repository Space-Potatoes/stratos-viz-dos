import { TemperatureComponent } from '../temperature/temperature.component';
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
  constructor() { }

}
