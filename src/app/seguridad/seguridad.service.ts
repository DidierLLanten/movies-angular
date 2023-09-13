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
  private readonly llaveToken = 'token';
  private readonly llaveExpiracion = 'token-expiracion';
  rol = '';

  estaLogueado(): boolean {
    const token = localStorage.getItem(this.llaveToken);
    if (!token) {
      return false;
    }

    const expiracionFechaString = localStorage.getItem(this.llaveExpiracion);
    const expiracionFecha = new Date(expiracionFechaString);
    if (expiracionFecha <= new Date()) {
      this.logout();
      return false;
    }

    return true;
  }

  logout() {
    localStorage.clear();
  }

  obtenerRol(): string {
    return this.rol;
  }

  obtenerCampoJWT(campo: string): string {
    const token = localStorage.getItem(this.llaveToken);
    if (!token) {
      return '';
    }
    var dataToken = JSON.parse(atob(token.split('.')[1]));

    return dataToken[campo];
  }

  registrar(
    credenciales: credencialesUsuario
  ): Observable<respuestaAutenticacion> {
    return this.httpClient.post<respuestaAutenticacion>(
      this.apiURL + '/crear',
      credenciales
    );
  }

  login(credenciales: credencialesUsuario): Observable<respuestaAutenticacion> {
    return this.httpClient.post<respuestaAutenticacion>(
      this.apiURL + '/login',
      credenciales
    );
  }

  guardarToken(respuestaAutenticacion: respuestaAutenticacion) {
    localStorage.setItem(this.llaveToken, respuestaAutenticacion.token);
    localStorage.setItem(
      this.llaveExpiracion,
      respuestaAutenticacion.expiracion.toString()
    );
  }
}
