import {Injectable} from '@angular/core';
import {Parametros} from '../models/Parametros';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {

  constructor(private http: HttpClient, private cs: ConfigService) {
  }

  list(parametros: Parametros): Observable<Parametros[]> {
    return this.http.post<Parametros[]>(this.cs.base + 'parametros/list', parametros, this.cs.httpOptions);
  }

  get(id: any): Observable<Parametros> {
    return this.http.get<Parametros>(this.cs.base + 'parametros/' + id, this.cs.httpOptions);
  }

  save(parametros: Parametros): Observable<Parametros> {
    return this.http.put<Parametros>(this.cs.base + 'parametros', parametros, this.cs.httpOptions);
  }

  insert(parametros: Parametros): Observable<Parametros> {
    return this.http.post<Parametros>(this.cs.base + 'parametros', parametros, this.cs.httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.cs.base + 'parametros/' + id, this.cs.httpOptions);
  }
}
