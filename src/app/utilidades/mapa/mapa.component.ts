import { Component } from '@angular/core';
import { tileLayer, latLng, LeafletMouseEvent, Marker } from 'leaflet';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
})
export class MapaComponent {
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '...',
      }),
    ],
    zoom: 19,
    center: latLng(4.546653363908692, -75.6734848018585),
  };

  capas: Marker<any>[] = [];

  handleClick(event: LeafletMouseEvent) {
    this.capas = [];
    const latitud = event.latlng.lat;
    const longitud = event.latlng.lng;
    this.capas.push(new Marker([latitud, longitud]));
  }
}
