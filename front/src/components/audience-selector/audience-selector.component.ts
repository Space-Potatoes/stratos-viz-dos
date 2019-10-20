import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { Audience, TextForAudience } from '../../types/audience';
import * as d3 from "d3";

@Component({
  selector: 'app-audience-selector',
  templateUrl: './audience-selector.component.html',
  styleUrls: ['./audience-selector.component.scss']
})
export class AudienceSelectorComponent implements AfterViewInit {

	// Children
	@ViewChild("bottomRegion", undefined) bottomRegion : ElementRef;
	@ViewChild("projectLogo", undefined) projectLogo : ElementRef;
	@ViewChild("teamLogo", undefined) teamLogo : ElementRef;
	@ViewChild("selector", undefined) selector : ElementRef;
	@ViewChild("overlay", undefined) overlay : ElementRef;
	@ViewChild("wrapper", undefined) wrapper : ElementRef;
	@ViewChild("credit", undefined) credit : ElementRef;
	@ViewChild("prompt", undefined) prompt : ElementRef;
	@ViewChild("hero", undefined) hero : ElementRef;

	// Variables
	private audience : Audience = undefined;

	// Events
	private audienceCallback : (audience : Audience) => void;
	public OnAudienceSelected(audienceCallback : (audience : Audience) => void) {
		this.audienceCallback = audienceCallback;
	}

	// Animations
	private shrink() {

		// Hide Team Logo
		const teamLogo = d3.select(this.teamLogo.nativeElement);
		teamLogo.transition().duration(1000).style("opacity", 0);

		// Hide Credit
		const credit = d3.select(this.credit.nativeElement);
		credit.transition().duration(1000).style("opacity", 0);

		// Hide bottom region
		const bottomRegion = d3.select(this.bottomRegion.nativeElement);
		bottomRegion.transition().duration(1000).style("height", 0).style("padding", "0px");

		// Align hero
		const hero = d3.select(this.hero.nativeElement);
		hero.transition().duration(1000).style("padding-right", "0px").style("height", "75px");
		hero.select(".badge").transition().duration(1000).style("height", "0px").style("opacity", 0).style("display", "none");

		// Hide unchecked options
		const options = d3.select(this.selector.nativeElement).selectAll(".option");
		options.transition().duration(1000)
			.style("font-size", "0px")
			.style("height", "0px")
			.style("opacity", 0)
			;

		const selector = d3.select(this.selector.nativeElement);
		selector.transition().duration(1000).style("margin-left", "16px");

		const checked = d3.select(this.selector.nativeElement).select(".checked");
		checked.transition().duration(0).style("display", "block").style("opacity", 1);

		const checked2 = d3.select(this.selector.nativeElement).select(".checked");
		checked2.transition().duration(1000)
			.style("line-height", "43px")
			.style("font-size", "22px")
			.style("height", "43px")
			;

		// Shrink project logo
		const projectLogo = d3.select(this.projectLogo.nativeElement);
		projectLogo.transition().duration(1000).style("height", "75px");

		// Shrink prompt
		const prompt = d3.select(this.prompt.nativeElement);
		prompt.transition().duration(1000)
			.style("line-height", "43px")
			.style("font-size", "22px")
			.style("height", "43px")
			;

		// Shrink wrapper
		const wrapper = d3.select(this.wrapper.nativeElement);
		wrapper.transition().duration(1000).style("height", "75px");

		// Recolor overlay
		const overlay = d3.select(this.overlay.nativeElement);
		overlay.transition().duration(1000).style("background-color", "darkcyan");

	}

	// Methods
	private selectAudience(audience : Audience, event : MouseEvent) {
		
		const selector = d3.select(this.selector.nativeElement).select(".checked");

		if (this.audience == undefined) {
			selector.classed("checked", false);
			d3.select(<HTMLSpanElement> event.srcElement).classed("checked", true);
			d3.select("body").style("overflow", "auto");
			this.shrink();
		}
		else {
			audience = (this.audience % 3) + 1;
			selector.text(TextForAudience(audience));
		}

		this.audience = audience;
		if (this.audienceCallback) this.audienceCallback(this.audience);
	}

	// Lifecycle
	ngAfterViewInit() {
		// window.scroll(0, 0);
		// d3.select("body").style("overflow", "hidden");
	}

	// Constructor
	constructor() { }
}
