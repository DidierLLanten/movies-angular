import { Injectable } from '@angular/core';
import { generoCreacionDTO, generoDTO } from './genero';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenerosService {
  constructor(private http: HttpClient) {}

  private apiURL = environment.apiURL + 'generos';

  public obtenerTodos(pagina: number, cantidadRegistrosMostrar: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadRegistrosMostrar.toString());
    return this.http.get<generoDTO[]>(this.apiURL, { observe: 'response', params });
  }

  public crear(genero: generoCreacionDTO) {
    return this.http.post(this.apiURL, genero);
  }
}
