import {Injectable} from '@angular/core';
import {Respuestas} from '../models/Respuestas';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RespuestasService {

  constructor(private http: HttpClient, private cs: ConfigService) {
  }

  listVi(respuestas: Respuestas): Observable<Respuestas[]> {
    return this.http.post<Respuestas[]>(this.cs.base + 'respuestas/listVi', respuestas, this.cs.httpOptions);
  }

  list(respuestas: Respuestas): Observable<Respuestas[]> {
    return this.http.post<Respuestas[]>(this.cs.base + 'respuestas/list', respuestas, this.cs.httpOptions);
  }

  get(id: any): Observable<Respuestas> {
    return this.http.get<Respuestas>(this.cs.base + 'respuestas/' + id, this.cs.httpOptions);
  }

  save(respuestas: Respuestas): Observable<Respuestas> {
    return this.http.put<Respuestas>(this.cs.base + 'respuestas', respuestas, this.cs.httpOptions);
  }

  insert(respuestas: Respuestas): Observable<Respuestas> {
    return this.http.post<Respuestas>(this.cs.base + 'respuestas', respuestas, this.cs.httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.cs.base + 'respuestas/' + id, this.cs.httpOptions);
  }
}