import { Component, ViewChild, ElementRef } from '@angular/core';
import { TimestampListener } from 'src/interfaces/timestamp';
import * as moment from "moment";
import * as d3 from "d3";

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements TimestampListener {

  // Children
  @ViewChild("date", undefined) date : ElementRef;
  @ViewChild("time", undefined) time : ElementRef;

  // Methods
  public onTimeStampChange(timestamp: number) {
    
    // Multiply by 1000 to convert into milliseconds
    const date = moment(new Date(timestamp * 1000)).utc();

    // Change date text
    var date_string = date.format("MMMM Do YYYY");
    d3.select(this.date.nativeElement).text(date_string);

    // Change time text
    var time_string = date.format("hh:mm:ss A");
    d3.select(this.time.nativeElement).text(time_string);

  }

  // Constructor
  constructor() { }

}
