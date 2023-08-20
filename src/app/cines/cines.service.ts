import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { cineCreacionDTO } from './cine';

@Injectable({
  providedIn: 'root',
})
export class CinesService {
  constructor(private http: HttpClient) {}

  private apiURL = environment.apiURL + 'cines';

  public crear(cine: cineCreacionDTO) {
    return this.http.post(this.apiURL, cine);
  }
}
