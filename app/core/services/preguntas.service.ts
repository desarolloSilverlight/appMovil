import {Injectable} from '@angular/core';
import {Preguntas} from '../models/Preguntas';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  constructor(private http: HttpClient, private cs: ConfigService) {
  }

  list(preguntas: Preguntas): Observable<Preguntas[]> {
    return this.http.post<Preguntas[]>(this.cs.base + 'preguntas/list', preguntas, this.cs.httpOptions);
  }

  get(id: any): Observable<Preguntas> {
    return this.http.get<Preguntas>(this.cs.base + 'preguntas/' + id, this.cs.httpOptions);
  }

  save(preguntas: Preguntas): Observable<Preguntas> {
    return this.http.put<Preguntas>(this.cs.base + 'preguntas', preguntas, this.cs.httpOptions);
  }

  insert(preguntas: Preguntas): Observable<Preguntas> {
    return this.http.post<Preguntas>(this.cs.base + 'preguntas', preguntas, this.cs.httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.cs.base + 'preguntas/' + id, this.cs.httpOptions);
  }
}