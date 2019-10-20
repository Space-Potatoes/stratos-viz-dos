import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AudienceListener } from '../../interfaces/audience';
import { Audience } from '../../types/audience';
import * as d3 from "d3";
import { TimestampListener } from 'src/interfaces/timestamp';
import { DataService } from 'src/services/data/data.service';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.scss']
})
export class TemperatureComponent implements AfterViewInit, AudienceListener, TimestampListener {

  // Children
  @ViewChild("professionalSvg", undefined) professionalSvg : ElementRef;
  @ViewChild("enthusiastSvg", undefined) enthusiastSvg : ElementRef;
  @ViewChild("professional", undefined) professional : ElementRef;
  @ViewChild("enthusiast", undefined) enthusiast : ElementRef;
  @ViewChild("junior", undefined) junior : ElementRef;

  // Constants
  private readonly toFahrenheit = (x) => x * 1.8000 + 32.00;
  private readonly toKelvin = (x) => x + 273.15;
  private readonly toCelsius = (x) => x;

  // Variables
  hasDrawnProfessional : boolean = false;
  hasDrawnEnthusiast : boolean = false;

  prevTemperature : number = 0;
  nextTemperature : number = 0;
  unitConv = this.toCelsius;
  temperature : number = 0;
  audience : Audience;

  // Methods
  public setData(prevTemperature : number, temperature : number, nextTemperature : number) {
    this.prevTemperature = prevTemperature;
    this.nextTemperature = nextTemperature;
    this.temperature = temperature;
    this.redraw();
  }

  public onAudienceChange(audience : Audience) {
    if (audience != Audience.Professional && this.unitConv == this.toKelvin) {
      this.changeUnit("c");
    }
    this.audience = audience;
    this.redraw();
  }

  public onTimeStampChange(timestamp : number) {
    
    this.dataService.getSWNAVHousekeepingData(timestamp).subscribe(x => {
      const array = JSON.parse(x);
      const mid = Math.floor(array.length / 2);

			const points = array.map(item => {
        const num = Number.parseInt(item.NAVIO_TEMP);
        return num;
      });

      this.setData(points[mid - 2], points[mid], points[mid + 2]);

    });
  }

  public unitChangeOnClick(event : MouseEvent) {
    const target = d3.select(<HTMLElement> event.target);
    if (target.classed("c")) this.changeUnit("c");
    if (target.classed("f")) this.changeUnit("f");
    if (target.classed("k")) this.changeUnit("k");
    this.redraw();
  }
  public changeUnit(unit : string) {

    d3.select(this.professional.nativeElement).selectAll(".buttons span").classed("selected", false);
    d3.select(this.enthusiast.nativeElement).selectAll(".buttons span").classed("selected", false);
    d3.select(this.junior.nativeElement).selectAll(".buttons span").classed("selected", false);

    if (unit == 'f' && this.unitConv != this.toFahrenheit) { 
      this.unitConv = this.toFahrenheit;

      d3.select(this.professional.nativeElement).select(".buttons .f").classed("selected", true);
      d3.select(this.enthusiast.nativeElement).select(".buttons .f").classed("selected", true);
      d3.select(this.junior.nativeElement).select(".buttons .f").classed("selected", true);
    }

    if (unit == 'c' && this.unitConv != this.toCelsius) { 
      this.unitConv = this.toCelsius; 

      d3.select(this.professional.nativeElement).select(".buttons .c").classed("selected", true);
      d3.select(this.enthusiast.nativeElement).select(".buttons .c").classed("selected", true);
      d3.select(this.junior.nativeElement).select(".buttons .c").classed("selected", true);
    }

    if (unit == 'k' && this.unitConv != this.toKelvin) { 
      this.unitConv = this.toKelvin; 

      d3.select(this.professional.nativeElement).select(".buttons .k").classed("selected", true);
      d3.select(this.enthusiast.nativeElement).select(".buttons .k").classed("selected", true);
      d3.select(this.junior.nativeElement).select(".buttons .k").classed("selected", true);
    }
  }

  private redraw() {

    // Professional
    if (this.audience == Audience.Professional) {

      d3.select(this.professional.nativeElement).classed("hidden", false);
      d3.select(this.enthusiast.nativeElement).classed("hidden", true);
      d3.select(this.junior.nativeElement).classed("hidden", true);

      this.updateProfessional();
    }

    // Enthusiast
    if (this.audience == Audience.Enthusiast) {

      d3.select(this.professional.nativeElement).classed("hidden", true);
      d3.select(this.enthusiast.nativeElement).classed("hidden", false);
      d3.select(this.junior.nativeElement).classed("hidden", true);

      this.updateEnthusiast();
    }

    // Junior
    if (this.audience == Audience.Junior) {

      d3.select(this.professional.nativeElement).classed("hidden", true);
      d3.select(this.enthusiast.nativeElement).classed("hidden", true);
      d3.select(this.junior.nativeElement).classed("hidden", false);

      this.updateJunior();
    }

  }

  private updateProfessional() {

    if (!this.hasDrawnProfessional) this.drawProfessional();

    // Gather data
    const svg = d3.select(this.professionalSvg.nativeElement);
    const box = (<SVGElement> svg.node()).getBoundingClientRect();

    const max = this.unitConv(100); // 100 degrees celsius
    const min = this.unitConv(-50); // -50 degrees celsius

    const scale = d3.scaleLinear().range([box.height - 20, 5]).domain([min, max]);
    const yAxis = d3.axisLeft(scale);

    const yAxisElement = svg.select("g");
    yAxisElement.call(yAxis);

    // Add bars
    const prevCircle = svg.select(".prevCircle");
    prevCircle.transition().duration(250).attr("cy", scale(this.unitConv(this.prevTemperature)));

    const prevLine = svg.select(".prevLine");
    prevLine.transition().duration(250)
      .attr("y1", scale(this.unitConv(this.prevTemperature)))
      .attr("y2", scale(this.unitConv(this.temperature)));

    const currCircle = svg.select(".currCircle");
    currCircle.transition().duration(250).attr("cy", scale(this.unitConv(this.temperature)));

    const currLine = svg.select(".currLine");
    currLine.transition().duration(250)
      .attr("y1", scale(this.unitConv(this.temperature)))
      .attr("y2", scale(this.unitConv(this.nextTemperature)));

    const nextCircle = svg.select(".nextCircle");
    nextCircle.transition().duration(250).attr("cy", scale(this.unitConv(this.nextTemperature)));
  }
  private drawProfessional() {
    
    const svg = d3.select(this.professionalSvg.nativeElement);
    const box = (<SVGElement> svg.node()).getBoundingClientRect();

    const max = this.unitConv(100); // 100 degrees celsius
    const min = this.unitConv(-50); // -50 degrees celsius

    const scale = d3.scaleLinear().range([box.height - 20, 5]).domain([min, max]);
    const yAxis = d3.axisLeft(scale);

    // Add the left axis
    const yAxisElement = svg.append("g");
    yAxisElement.call(yAxis);

    const yAxisBox = (<SVGElement> yAxisElement.node()).getBoundingClientRect();
    yAxisElement.attr("transform", `translate(${yAxisBox.width}, 0)`);

    // Add the bottom labels
    const labelPrev = svg.append("text").classed("labelPrev", true);
    labelPrev.style("font-family", "Helvetica Neue, Helvetica, sans-serif");
    labelPrev.style("font-size", "12px");
    labelPrev.attr("y", box.height - 0);
    labelPrev.text("Previous");

    const labelPrevBox = (<SVGElement> labelPrev.node()).getBoundingClientRect();
    labelPrev.attr("x", yAxisBox.width + 20);

    const labelCurr = svg.append("text").classed("labelCurr", true);
    labelCurr.style("font-family", "Helvetica Neue, Helvetica, sans-serif");
    labelCurr.style("font-size", "12px");
    labelCurr.attr("y", box.height - 0);
    labelCurr.text("Current");

    const labelCurrBox = (<SVGElement> labelCurr.node()).getBoundingClientRect();
    labelCurr.attr("x", yAxisBox.width + labelPrevBox.width + 50);

    const labelNext = svg.append("text").classed("labelNext", true);
    labelNext.style("font-family", "Helvetica Neue, Helvetica, sans-serif");
    labelNext.style("font-size", "12px");
    labelNext.attr("y", box.height - 0);
    labelNext.text("Next");

    const labelNextBox = (<SVGElement> labelNext.node()).getBoundingClientRect();
    labelNext.attr("x", yAxisBox.width + labelPrevBox.width + labelCurrBox.width + 80);

    // Add circles

    const prevLine = svg.append("line").classed("prevLine", true);
    prevLine.attr("x1", yAxisBox.width + 20 + labelPrevBox.width / 2);
    prevLine.attr("y1", scale(this.unitConv(this.prevTemperature)));
    prevLine.attr("x2", yAxisBox.width + labelPrevBox.width + 50 + labelCurrBox.width / 2);
    prevLine.attr("y2", scale(this.unitConv(this.temperature)));
    prevLine.attr("stroke-width", "2");
    prevLine.attr("stroke", "#1464AC");

    const currLine = svg.append("line").classed("currLine", true);
    currLine.attr("x1", yAxisBox.width + labelPrevBox.width + 50 + labelCurrBox.width / 2);
    currLine.attr("y1", scale(this.unitConv(this.temperature)));
    currLine.attr("x2", yAxisBox.width + labelPrevBox.width + labelCurrBox.width + 80 + labelNextBox.width / 2);
    currLine.attr("y2", scale(this.unitConv(this.nextTemperature)));
    currLine.attr("stroke-width", "2");
    currLine.attr("stroke", "#1464AC");

    const prevCircle = svg.append("circle").classed("prevCircle", true);
    prevCircle.attr("cx", yAxisBox.width + 20 + labelPrevBox.width / 2);
    prevCircle.attr("cy", scale(this.unitConv(this.prevTemperature)));
    prevCircle.attr("fill", "red");
    prevCircle.attr("r", 3);
    
    const currPoint = svg.append("circle").classed("currCircle", true);
    currPoint.attr("cx", yAxisBox.width + labelPrevBox.width + 50 + labelCurrBox.width / 2);
    currPoint.attr("cy", scale(this.unitConv(this.temperature)));
    currPoint.attr("r", 3);

    const nextCircle = svg.append("circle").classed("nextCircle", true);
    nextCircle.attr("cx", yAxisBox.width + labelPrevBox.width + labelCurrBox.width + 80 + labelNextBox.width / 2);
    nextCircle.attr("cy", scale(this.unitConv(this.nextTemperature)));
    nextCircle.attr("r", 3);

    this.hasDrawnProfessional = true;
  }

  private updateEnthusiast() {

    if (!this.hasDrawnEnthusiast) this.drawEnthusiast();

    // Gather data
    const svg = d3.select(this.enthusiastSvg.nativeElement);
    const box = (<SVGElement> svg.node()).getBoundingClientRect();

    const max = this.unitConv(100); // 100 degrees celsius
    const min = this.unitConv(-50); // -50 degrees celsius

    const scale = d3.scaleLinear().range([box.height - 20, 5]).domain([min, max]);
    const yAxis = d3.axisLeft(scale);

    const yAxisElement = svg.select("g");
    yAxisElement.call(yAxis);

    const bar = svg.select(".bar");
    bar
      .transition().duration(250)
      .attr("height", scale(min) - scale(this.unitConv(this.temperature)))
      .attr("y", scale(this.unitConv(this.temperature)));
  }
  private drawEnthusiast() {

    const svg = d3.select(this.enthusiastSvg.nativeElement);
    const box = (<SVGElement> svg.node()).getBoundingClientRect();

    const max = this.unitConv(100); // 100 degrees celsius
    const min = this.unitConv(-50); // -50 degrees celsius

    const scale = d3.scaleLinear().range([box.height - 20, 5]).domain([min, max]);
    const yAxis = d3.axisLeft(scale);

    // Add the left axis
    const yAxisElement = svg.append("g");
    yAxisElement.call(yAxis);

    const yAxisBox = (<SVGElement> yAxisElement.node()).getBoundingClientRect();
    yAxisElement.attr("transform", `translate(${yAxisBox.width}, 0)`);

    // Add the bottom labels
    const label = svg.append("text").classed("label", true);
    label.style("font-family", "Helvetica Neue, Helvetica, sans-serif");
    label.style("font-size", "12px");
    label.attr("y", box.height - 0);
    label.text("Current");

    const labelBox = (<SVGElement> label.node()).getBoundingClientRect();
    label.attr("x", yAxisBox.width + 20);

    // Add bar
    const bar = svg.append("rect").classed("bar", true);
    bar.attr("height", scale(min) - scale(this.unitConv(this.temperature)));
    bar.attr("y", scale(this.unitConv(this.temperature)));
    bar.attr("x", yAxisBox.width + 20);
    bar.attr("width", labelBox.width);
    bar.attr("fill", "#E4514D");
    bar.attr("rx", "5");

    this.hasDrawnEnthusiast = true;
  }

  private updateJunior() {

    const container = d3.select(this.junior.nativeElement);

    const max = this.unitConv(100);
    const min = this.unitConv(-50);
    const val = (Math.round(this.unitConv(this.temperature)) - min) / (max - min);

    const value = container.select(".value-bar .fill");
    value.transition().duration(250).style("width", (val * 100) + "%");

    var unit = "C";
    if (this.unitConv == this.toFahrenheit) unit = "F";
    if (this.unitConv == this.toKelvin) unit = "K";

    const text = container.selectAll(".text");
    text.text(Math.round(this.unitConv(this.temperature)) + "° " + unit);
  }

  // Lifecycle
  ngAfterViewInit() {
    this.onAudienceChange(Audience.Enthusiast);
  }

  // Constructor
  constructor(private dataService : DataService) { }

}
