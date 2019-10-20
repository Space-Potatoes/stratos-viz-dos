import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { TimestampListener } from 'src/interfaces/timestamp';
import { AudienceListener } from '../../interfaces/audience';
import { DataService } from 'src/services/data/data.service';
import { Audience } from '../../types/audience';
import * as d3 from "d3";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements AfterViewInit, AudienceListener, TimestampListener {

  // Children
  @ViewChild("downloadButton", undefined) downloadButton : ElementRef;
  @ViewChild("professional", undefined) professional : ElementRef;
  @ViewChild("enthusiast", undefined) enthusiast : ElementRef;
  @ViewChild("junior", undefined) junior : ElementRef;

  // Variables
  hasDrawnProfessional : boolean = false;
  hasDrawnEnthusiast : boolean = false;
  audience : Audience;

  // Methods
  public onAudienceChange(audience : Audience) {
    this.audience = audience;
    this.redraw();
  }

  public onTimeStampChange(timestamp : number) {
    // TODO: Change button to have a link to the large pictures
    this.redraw();
  }

  private redraw() {

    // Professional
    if (this.audience == Audience.Professional) {
      d3.select(this.professional.nativeElement).classed("hidden", false);
      d3.select(this.enthusiast.nativeElement).classed("hidden", false);
      d3.select(this.junior.nativeElement).classed("hidden", false);
    }

    // Enthusiast
    if (this.audience == Audience.Enthusiast) {
      d3.select(this.professional.nativeElement).classed("hidden", true);
      d3.select(this.enthusiast.nativeElement).classed("hidden", false);
      d3.select(this.junior.nativeElement).classed("hidden", false);
    }

    // Junior
    if (this.audience == Audience.Junior) {
      d3.select(this.professional.nativeElement).classed("hidden", true);
      d3.select(this.enthusiast.nativeElement).classed("hidden", true);
      d3.select(this.junior.nativeElement).classed("hidden", false);
    }

  }

  // Lifecycle
  ngAfterViewInit() {
  }

  // Constructor
  constructor(private dataService : DataService) { }

}
