import {Injectable} from '@angular/core';
import {Notificaciones} from '../models/Notificaciones';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  constructor(private http: HttpClient, private cs: ConfigService) {
  }

  list(notificaciones: Notificaciones): Observable<Notificaciones[]> {
    return this.http.post<Notificaciones[]>(this.cs.base + 'notificaciones/list', notificaciones, this.cs.httpOptions);
  }

  listVi(notificaciones: Notificaciones): Observable<Notificaciones[]> {
    return this.http.post<Notificaciones[]>(this.cs.base + 'notificaciones/listVi', notificaciones, this.cs.httpOptions);
  }

  get(id: any): Observable<Notificaciones> {
    return this.http.get<Notificaciones>(this.cs.base + 'notificaciones/' + id, this.cs.httpOptions);
  }

  save(notificaciones: Notificaciones): Observable<Notificaciones> {
    return this.http.put<Notificaciones>(this.cs.base + 'notificaciones', notificaciones, this.cs.httpOptions);
  }

  insert(notificaciones: Notificaciones): Observable<Notificaciones> {
    return this.http.post<Notificaciones>(this.cs.base + 'notificaciones', notificaciones, this.cs.httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.cs.base + 'notificaciones/' + id, this.cs.httpOptions);
  }
}
