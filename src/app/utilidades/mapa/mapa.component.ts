import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  tileLayer,
  latLng,
  LeafletMouseEvent,
  Marker,
  marker,
  icon,
} from 'leaflet';
import { Coordenada, CoordenadaConMensaje } from './coordenada';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
})
export class MapaComponent implements OnInit {
  @Input()
  coordenadasIniciales: CoordenadaConMensaje[] = [];

  @Input()
  soloLectura: boolean = false;

  @Output()
  coordenadaSeleccionada: EventEmitter<Coordenada> =
    new EventEmitter<Coordenada>();

  ngOnInit(): void {
    this.capas = this.coordenadasIniciales.map((coordenada) => {
      let marcador = marker([coordenada.latitud, coordenada.longitud], {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'marker-icon.png',
          iconRetinaUrl: 'marker-icon-2x.png',
          shadowUrl: 'assets/marker-shadow.png',
        }),
      });

      if(coordenada.mensaje){
        marcador.bindPopup(coordenada.mensaje, {autoClose: false, autoPan: false})

      }

      return marcador;
    });
  }

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
    if (!this.soloLectura) {
      const latitud = event.latlng.lat;
      const longitud = event.latlng.lng;

      this.capas = [];
      this.capas.push(
        marker([latitud, longitud], {
          icon: icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: 'marker-icon.png',
            iconRetinaUrl: 'marker-icon-2x.png',
            shadowUrl: 'assets/marker-shadow.png',
          }),
        })
      );
      this.coordenadaSeleccionada.emit({
        latitud: latitud,
        longitud: longitud,
      });
    }
  }
}
