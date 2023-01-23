import {Injectable} from '@angular/core';
import {TpNotificaciones} from '../models/TpNotificaciones';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TpNotificacionesService {

  constructor(private http: HttpClient, private cs: ConfigService) {
  }

  list(tpNotificaciones: TpNotificaciones): Observable<TpNotificaciones[]> {
    return this.http.post<TpNotificaciones[]>(this.cs.base + 'tpNotificaciones/list', tpNotificaciones, this.cs.httpOptions);
  }

  get(id: any): Observable<TpNotificaciones> {
    return this.http.get<TpNotificaciones>(this.cs.base + 'tpNotificaciones/' + id, this.cs.httpOptions);
  }

  save(tpNotificaciones: TpNotificaciones): Observable<TpNotificaciones> {
    return this.http.put<TpNotificaciones>(this.cs.base + 'tpNotificaciones', tpNotificaciones, this.cs.httpOptions);
  }

  insert(tpNotificaciones: TpNotificaciones): Observable<TpNotificaciones> {
    return this.http.post<TpNotificaciones>(this.cs.base + 'tpNotificaciones', tpNotificaciones, this.cs.httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.cs.base + 'tpNotificaciones/' + id, this.cs.httpOptions);
  }
}