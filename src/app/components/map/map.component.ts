import { Component, OnInit, Input, ViewChild } from '@angular/core';

declare var mapboxgl: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  @Input() coords;
  @ViewChild('map') map;

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    const latLng = this.coords.split(',');
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);

    mapboxgl.accessToken = 'pk.eyJ1IjoibWF0aWFzYmFlejI1IiwiYSI6ImNqdXB1aDMxZjByaTg0NGxqZ2Jpdm9vMncifQ.rBB54IV-jv8KTVq2V8aQqg';
    const map = new mapboxgl.Map({
      container: this.map.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 15
    });

    const marker = new mapboxgl.Marker()
    .setLngLat([lng, lat])
    .addTo(map);
  }

}
