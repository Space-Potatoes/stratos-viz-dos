import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'app-gravity',
  templateUrl: './gravity.component.html',
  styleUrls: ['./gravity.component.scss']
})
export class GravityComponent implements OnInit, AfterViewInit {

  @ViewChild("paragraph", undefined) paragraph : ElementRef;

  constructor() { }

  ngAfterViewInit() {
    var gravity = 9.8 //m/s2
    var height = 35000 //altitude in meters
    var weight = 80 //kgs
    d3.select(this.paragraph.nativeElement)
      .transition()
      .duration(1000)
      .delay(250)
      .attr("name", "potate")
      .style("height", "1px");

      // The force of gravity, g = 9.8 m/s2
      // Gravity accelerates you at 9.8 meters per second per second. After one second, you're falling 9.8 m/s. After two seconds, you're falling 19.6 m/s, and so on.
      // Time to splat: sqrt ( 2 * height / 9.8 )
      var time = Math.sqrt ( 2 * height / gravity )
      time = Math.round(time)
      // It's the square root because you fall faster the longer you fall.
      // The more interesting question is why it's times two: If you accelerate for 1 second, your average speed over that time is increased by only 9.8 / 2 m/s.
      // Velocity at splat time: sqrt( 2 * g * height )
      var velocity = Math.sqrt(2 * gravity * height)
      velocity = Math.round(velocity)
      // This is why falling from a higher height hurts more.
      // Energy at splat time: 1/2 * mass * velocity2 = mass * g * height

    this.paragraph.nativeElement.innerHTML = "It will take ~"+time+" seconds for a person of "+weight+" kg to fall from a height of "+height+" meters with gravitation pull of "+gravity+" m/s, during which you will fall at the speed of "+velocity+" m/s"
  }

  ngOnInit() {
  }

}
