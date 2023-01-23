import {Injectable} from '@angular/core';
import {Contenidos} from '../models/Contenidos';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContenidosService {

  constructor(private http: HttpClient, private cs: ConfigService) {
  }

  list(contenidos: Contenidos): Observable<Contenidos[]> {
    return this.http.post<Contenidos[]>(this.cs.base + 'contenidos/list', contenidos, this.cs.httpOptions);
  }

  get(id: any): Observable<Contenidos> {
    return this.http.get<Contenidos>(this.cs.base + 'contenidos/' + id, this.cs.httpOptions);
  }

  save(contenidos: Contenidos): Observable<Contenidos> {
    return this.http.put<Contenidos>(this.cs.base + 'contenidos', contenidos, this.cs.httpOptions);
  }

  insert(contenidos: Contenidos): Observable<Contenidos> {
    return this.http.post<Contenidos>(this.cs.base + 'contenidos', contenidos, this.cs.httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.cs.base + 'contenidos/' + id, this.cs.httpOptions);
  }
}