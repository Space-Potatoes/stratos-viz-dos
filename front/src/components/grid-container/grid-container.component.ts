import { AudienceListener } from '../../interfaces/audience';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Audience } from '../../types/audience';
import { AltitudeComponent } from '../altitude/altitude.component';

@Component({
  selector: 'app-grid-container',
  templateUrl: './grid-container.component.html',
  styleUrls: ['./grid-container.component.scss']
})
export class GridContainerComponent implements AudienceListener {
  
  // Children
  @ViewChild(AltitudeComponent, undefined) altitudeComponent : AltitudeComponent;

  // Interface
  public onAudienceChange(audience: Audience) {
    this.altitudeComponent.onAudienceChange(audience);
  }

  // Constructor
  constructor() { }

}
