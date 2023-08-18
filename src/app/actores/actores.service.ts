import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { actorCreacionDTO } from './actor';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ActoresService {
  constructor(private http: HttpClient) {}

  private apiURL = environment.apiURL + 'actores';

  public crear(actor: actorCreacionDTO) {
    return this.http.post(this.apiURL, actor);
  }
}
