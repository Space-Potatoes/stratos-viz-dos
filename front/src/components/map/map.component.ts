import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public map;
  constructor() { }

  ngOnInit() {
    this.map = L.map('map').setView([48.5704, -81.3694], 13);

    // example marker
    const marker = L.circle([48.5704, -81.3694], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 200
    }).addTo(this.map);

    marker.on('mouseover', function(e){
      var coord = e.latlng;
      var lat = coord.lat;
      var lng = coord.lng;
      // e contains an x+y coord relative to the map on the screen.
      console.log("You clicked the map at latitude: " + lat + " and longitude: " + lng);
    });

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

}
