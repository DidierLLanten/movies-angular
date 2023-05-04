import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent implements OnInit {
  @Input()
  maximoRating = 5;
  @Input()
  ratingSeleccionado = 0;

  maximoRatingArr = [];
  votado = false;
  ratingAtnerior = 0;

  constructor() {}

  ngOnInit(): void {
    this.maximoRatingArr = Array(this.maximoRating).fill(0);
  }

  manejarMouseEnter(index: number): void {
    this.ratingSeleccionado = index + 1;
  }

  manejarMouseLeave() {
    if (this.ratingAtnerior > 0) {
      this.ratingSeleccionado = this.ratingAtnerior;
    } else {
      this.ratingSeleccionado = 0;
    }
  }

  rate(index: number): void {
    this.ratingSeleccionado = index + 1;
    this.votado = true;
    this.ratingAtnerior = this.ratingSeleccionado;
  }
}
