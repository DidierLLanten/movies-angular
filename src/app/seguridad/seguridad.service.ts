import { Injectable } from '@angular/core';
import { credencialesUsuario, respuestaAutenticacion } from './seguridad';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SeguridadService {
  constructor(private httpClient: HttpClient) {}

  apiURL = environment.apiURL + 'cuentas';
  rol = '';

  estaLogueado(): boolean {
    return !!this.rol;
  }

  obtenerRol(): string {
    return this.rol;
  }

  registrar(credenciales: credencialesUsuario): Observable<respuestaAutenticacion> {
    return this.httpClient.post<respuestaAutenticacion>(this.apiURL +'/crear', credenciales)
  }
}
