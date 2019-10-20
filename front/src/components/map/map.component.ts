import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Point } from "../../types/point";
import * as L from 'leaflet';
import * as d3 from "d3";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

	// Children
	@ViewChild("overlay", undefined) overlay : ElementRef;

	// Variables
	private pointProjections : PointProjection[];
	public map : L.Map;

	// Methods
	private drawLine(from : PointProjection, to : PointProjection) {
		
		const overlay = d3.select(this.overlay.nativeElement);
		const line = overlay.append("line");

		// Position line
		line.attr("x1", from.PX).attr("y1", from.PY)
			.attr("x2", to.PX).attr("y2", to.PY)
			.attr("stroke", "darkcyan")
			.attr("stroke-width", 5)
			;
	}

	private drawPoint(point : PointProjection) {

		const overlay = d3.select(this.overlay.nativeElement);
		overlay.append("circle")
			.attr("cx", point.PX)
			.attr("cy", point.PY)
			.attr("r", 7)
			.attr("fill", "darkcyan");

	}

	public setPoints(points : Point[]) {

		// Set map bounds
		const destin = new L.LatLng(points[points.length - 1].Latitude, points[points.length - 1].Longitude);
		const origin = new L.LatLng(points[0].Latitude, points[0].Longitude);
		this.map.fitBounds(new L.LatLngBounds(origin, destin));

		// Map points to projections
		this.pointProjections = points.map(x => {
			const proj = this.map.latLngToLayerPoint(new L.LatLng(x.Latitude, x.Longitude));
			return new PointProjection(x, proj.x, proj.y);
		});

		// Sort items
		this.pointProjections.sort((x, y) => x.PX - y.PX);
	}

	private mouseMove() {

		// Gather data
		const overlay = d3.select(this.overlay.nativeElement);
		const event = <MouseEvent> d3.event;

		// Create/Retrieve the guide line
		var guideLine = overlay.select(".guideLine");

		if (guideLine.empty()) {
			const height = (<SVGElement> overlay.node()).getBoundingClientRect().height;

			guideLine = overlay.append("line").classed("guideLine", true);
			guideLine.attr("stroke-width", 3).attr("stroke", "green");
			guideLine.attr("y1", 0).attr("y2", height);
		}

		// Create/Retrieve the hover circle
		var hoverCircle = overlay.select(".hover");

		if (hoverCircle.empty()) {
			hoverCircle = overlay.append("circle").classed("hover", true);
			hoverCircle.attr("r", 10).attr("fill", "red");
		}

		// Calculate the X
		const x = event.offsetX;
		var y = undefined;

		// Calculate the Y
		for (var i = 0; i < this.pointProjections.length - 1; ++i) {
			const next = this.pointProjections[i + 1];
			const point = this.pointProjections[i];

			if (point.PX <= x && next.PX >= x) {
				const pct = (x - point.PX) / (next.PX - point.PX);
				y = pct * (next.PY - point.PY) + point.PY;
			}
		}

		// Position the elements
		if (y) {
			hoverCircle.attr("cx", x).attr("cy", y);
			guideLine.attr("x1", x).attr("x2", x);
		}
	}

	public drawPoints() {

		const first = this.pointProjections[0];
		const last = this.pointProjections[this.pointProjections.length - 1];

		this.drawPoint(first);
		this.drawPoint(last);

		for (var i = 0; i < this.pointProjections.length - 1; ++i) {
			const next = this.pointProjections[i + 1];
			const point = this.pointProjections[i];
			this.drawLine(point, next);
		}
	}

	// Lifecycle
	ngOnInit() {

		// Initialize Map
		this.map = L.map('map', { zoomControl: false });
		this.map.dragging.disable();
		
		// Set the tile layer
		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(this.map);

		// Add mouse event listener
		d3.select(this.overlay.nativeElement).on("mousemove", () => this.mouseMove());

		// Draw the points
		const origin_point = new Point(48.5704, -81.3694, 0);
		const destin_point = new Point(48.632, -83.9413, 0);
		const mid_point = new Point(48.8, -82.6000, 0);

		this.setPoints([origin_point, mid_point, destin_point]);
		this.drawPoints();
	}

	// Constructor
	constructor() { }
}

class PointProjection {

	constructor (public readonly Point : Point,
				 public readonly PX : number,
				 public readonly PY : number) {}

}
