import {Injectable} from '@angular/core';
import {Consultas} from '../models/Consultas';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';
import {delayedRetry} from '../constants/RetryUtils';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  constructor(private http: HttpClient, private cs: ConfigService) {
  }

  list(consultas: Consultas): Observable<Consultas[]> {
    return this.http.post<Consultas[]>(this.cs.base + 'consultas/list', consultas, this.cs.httpOptions).pipe(delayedRetry());
  }

  listVi(consultas: Consultas): Observable<Consultas[]> {
    return this.http.post<Consultas[]>(this.cs.base + 'consultas/listVi', consultas, this.cs.httpOptions).pipe(delayedRetry());
  }

  get(id: any): Observable<Consultas> {
    return this.http.get<Consultas>(this.cs.base + 'consultas/' + id, this.cs.httpOptions);
  }

  isInitialized(id: any): Observable<any> {
    return this.http.get<any>(this.cs.base + 'consultas/isInitialized/' + id, this.cs.httpOptions);
  }

  irContenido(id: any): Observable<any> {
    return this.http.get<any>(this.cs.base + 'consultas/irContenido/' + id, this.cs.httpOptions);
  }

  save(consultas: Consultas): Observable<Consultas> {
    return this.http.put<Consultas>(this.cs.base + 'consultas', consultas, this.cs.httpOptions);
  }

  insert(consultas: Consultas): Observable<Consultas> {
    return this.http.post<Consultas>(this.cs.base + 'consultas', consultas, this.cs.httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.cs.base + 'consultas/' + id, this.cs.httpOptions);
  }

  generarRuta(idConsulta: number) {
    return this.http.post(this.cs.base + 'consultas/ruta/' + idConsulta, this.cs.httpOptions);
  }

  borrarRuta(idConsulta: number) {
    return this.http.post(this.cs.base + 'consultas/deleteRuta/' + idConsulta, this.cs.httpOptions);
  }
}
