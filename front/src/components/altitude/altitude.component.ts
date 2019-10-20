import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Audience } from '../../types/audience';
import * as d3 from "d3";

@Component({
  selector: 'app-altitude',
  templateUrl: './altitude.component.html',
  styleUrls: ['./altitude.component.scss']
})
export class AltitudeComponent implements AfterViewInit {

  // Children
  @ViewChild("professionalSvg", undefined) professionalSvg : ElementRef;
  @ViewChild("enthusiastSvg", undefined) enthusiastSvg : ElementRef;
  @ViewChild("professional", undefined) professional : ElementRef;
  @ViewChild("enthusiast", undefined) enthusiast : ElementRef;
  @ViewChild("junior", undefined) junior : ElementRef;

  // Variables
  hasDrawnProfessional : boolean = false;
  hasDrawnEnthusiast : boolean = false;

  prevHeight : number = 0;
  nextHeight : number = 0;
  height : number = 0;
  audience : Audience;

  // Methods
  public setData(prevHeight : number, height : number, nextHeight : number) {
    this.prevHeight = prevHeight;
    this.nextHeight = nextHeight;
    this.height = height;

    this.redraw();
  }

  private changeAudience(audience : Audience) {
    this.audience = audience;
    this.redraw();
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

    const max = 50000; // 50km in meters
    const min = 30000; // 30km as the minimum

    const scale = d3.scaleLinear().range([box.height - 20, 5]).domain([min / 1000, max / 1000]);

    // Add bars
    const prevBar = svg.select(".prevBar");
    prevBar
      .transition()
      .duration(250)
      .attr("height", scale(30) - scale(this.prevHeight))
      .attr("y", scale(this.prevHeight));

    const currBar = svg.select(".currBar");
    currBar
      .transition()
      .duration(250)
      .attr("height", scale(30) - scale(this.height))
      .attr("y", scale(this.height));

    const nextBar = svg.select(".nextBar");
    nextBar
      .transition()
      .duration(250)
      .attr("height", scale(30) - scale(this.nextHeight))
      .attr("y", scale(this.nextHeight));

  }
  private drawProfessional() {
    
    const svg = d3.select(this.professionalSvg.nativeElement);
    const box = (<SVGElement> svg.node()).getBoundingClientRect();

    const max = 50000; // 50km in meters
    const min = 30000; // 30km as the minimum

    const scale = d3.scaleLinear().range([box.height - 20, 5]).domain([min / 1000, max / 1000]);
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
    labelPrev.text("-1 Min");

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
    labelNext.text("+1 Min");

    labelNext.attr("x", yAxisBox.width + labelPrevBox.width + labelCurrBox.width + 80);

    // Add bars
    const prevBar = svg.append("rect").classed("prevBar", true);
    prevBar.attr("height", scale(30) - scale(this.prevHeight));
    prevBar.attr("y", scale(this.prevHeight));
    prevBar.attr("width", labelPrevBox.width);
    prevBar.attr("x", yAxisBox.width + 20);
    prevBar.attr("fill", "red");

    const currBar = svg.append("rect").classed("currBar", true);
    currBar.attr("x", yAxisBox.width + labelPrevBox.width + 50);
    currBar.attr("height", scale(30) - scale(this.height));
    currBar.attr("width", labelCurrBox.width);
    currBar.attr("y", scale(this.height));

    const nextBar = svg.append("rect").classed("nextBar", true);
    nextBar.attr("x", yAxisBox.width + labelPrevBox.width + labelCurrBox.width + 80);
    nextBar.attr("height", scale(30) - scale(this.nextHeight));
    nextBar.attr("width", labelCurrBox.width);
    nextBar.attr("y", scale(this.nextHeight));

    this.hasDrawnProfessional = true;
  }

  private updateEnthusiast() {

    if (!this.hasDrawnEnthusiast) this.drawEnthusiast();

    // Gather data
    const svg = d3.select(this.enthusiastSvg.nativeElement);
    const box = (<SVGElement> svg.node()).getBoundingClientRect();

    const max = 50000; // 50km in meters
    const min = 30000; // 30km as the minimum

    // Draw value line
    const valPct = (this.height * 1000 - min) / (max - min);
    const valHeight = (1 - valPct) * box.height;

    const valLine = svg.select(".val-line");
    valLine
      .transition()
      .duration(250)
      .attr("y1", valHeight)
      .attr("y2", valHeight);

    const valText = svg.select(".val-text");
    valText
      .transition()
      .duration(250)
      .attr("y", Math.max(valHeight - 10, 25))
      .text(`${this.height}KM`);

  }
  private drawEnthusiast() {

    const svg = d3.select(this.enthusiastSvg.nativeElement);
    const box = (<SVGElement> svg.node()).getBoundingClientRect();

    const max = 50000; // 50km in meters
    const min = 30000; // 30km as the minimum

    // Draw min line
    const minLine = svg.append("line").classed("min-line", true);
    minLine.attr("stroke", "darkcyan").attr("stroke-dasharray", 4);
    minLine.attr("x1", 0).attr("x2", box.width);
    minLine.attr("y1", 0).attr("y2", 0);
    minLine.attr("stroke-width", 3);

    // Draw max line
    const maxLine = svg.append("line").classed("max-line", true);
    maxLine.attr("stroke", "darkcyan").attr("stroke-dasharray", 4);
    maxLine.attr("y1", box.height).attr("y2", box.height);
    maxLine.attr("x1", 0).attr("x2", box.width);
    maxLine.attr("stroke-width", 3);

    // Draw range background
    const background = svg.append("rect").classed("background", true);
    background.attr("width", box.width).attr("height", box.height - 10);
    background.attr("fill", "darkcyan").style("opacity", 0.5);
    background.attr("x", 0).attr("y", 5);
    background.attr("rx", 5);

    // Draw text
    const text = svg.append("text").classed("text", true);
    text.style("font-family", "Helvetica Neue, Helvetica, sans-serif");
    text.attr("y", box.height / 2).style("opacity", 0.5);
    text.attr("fill", "darkcyan");
    text.text("Stratosphere");
    text.attr("x", 16);

    // Draw axis values
    const axisTop = svg.append("text").classed("axisTop", true);
    axisTop.style("font-family", "Helvetica Neue, Helvetica, sans-serif");
    axisTop.attr("y", 25).style("opacity", 0.5);
    axisTop.attr("x", box.width - 50);
    axisTop.attr("fill", "darkcyan");
    axisTop.text("50KM");

    const axisBot = svg.append("text").classed("axisTop", true);
    axisBot.style("font-family", "Helvetica Neue, Helvetica, sans-serif");
    axisBot.attr("y", box.height - 20).style("opacity", 0.5);
    axisBot.attr("x", box.width - 50);
    axisBot.attr("fill", "darkcyan");
    axisBot.text("30KM");

    // Draw value line
    const valPct = (this.height * 1000 - min) / (max - min);
    const valHeight = (1 - valPct) * box.height;

    const valLine = svg.append("line").classed("val-line", true);
    valLine.attr("x1", 0).attr("x2", box.width);
    valLine.attr("stroke-width", 3);
    valLine.attr("stroke", "navy");

    const valText = svg.append("text").classed("val-text", true);
    valText.style("font-family", "Helvetica Neue, Helvetica, sans-serif");
    valText.text(`${this.height}KM`);
    valText.attr("fill", "navy");
    valText.attr("x", 16);

    this.hasDrawnEnthusiast = true;
  }

  private updateJunior() {

    const container = d3.select(this.junior.nativeElement);
    const cnTowerHeight = 553;

    const mult = Math.round((this.height * 1000) / cnTowerHeight);
    const val = Math.round(this.height);

    const mult_value = container.selectAll(".mult-value");
    mult_value.transition().duration(250).style("opacity", 0);
    mult_value.transition().duration(250).delay(250).style("opacity", 1).text(mult);

    const value = container.select(".value");
    value.transition().duration(250).style("opacity", 0);
    value.transition().duration(250).delay(250).style("opacity", 1).text(val + "KM");

  }

  // Lifecycle
  ngAfterViewInit() {
    this.changeAudience(Audience.Enthusiast);
    this.setData(45, 42.5, 35);
  }

  // Constructor
  constructor() { }

}
