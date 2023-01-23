import {Injectable} from '@angular/core';
import {ContenidosAddConsulta} from '../models/ContenidosAddConsulta';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContenidosAddConsultaService {

  constructor(private http: HttpClient, private cs: ConfigService) {
  }

  list(contenidosAddConsulta: ContenidosAddConsulta): Observable<ContenidosAddConsulta[]> {
    return this.http.post<ContenidosAddConsulta[]>(this.cs.base + 'contenidosAddConsulta/list', contenidosAddConsulta, this.cs.httpOptions);
  }

  get(id: any): Observable<ContenidosAddConsulta> {
    return this.http.get<ContenidosAddConsulta>(this.cs.base + 'contenidosAddConsulta/' + id, this.cs.httpOptions);
  }

  save(contenidosAddConsulta: ContenidosAddConsulta): Observable<ContenidosAddConsulta> {
    return this.http.put<ContenidosAddConsulta>(this.cs.base + 'contenidosAddConsulta', contenidosAddConsulta, this.cs.httpOptions);
  }

  insert(contenidosAddConsulta: ContenidosAddConsulta): Observable<ContenidosAddConsulta> {
    return this.http.post<ContenidosAddConsulta>(this.cs.base + 'contenidosAddConsulta', contenidosAddConsulta, this.cs.httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.cs.base + 'contenidosAddConsulta/' + id, this.cs.httpOptions);
  }
}