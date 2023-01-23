import {Injectable} from '@angular/core';
import {Permiso} from '../models/Permiso';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PermisoService {

  constructor(private http: HttpClient, private cs: ConfigService) {
  }

  list(permisos: Permiso): Observable<Permiso[]> {
    return this.http.post<Permiso[]>(this.cs.base + 'permisos/list', permisos, this.cs.httpOptions);
  }

  get(id: any): Observable<Permiso> {
    return this.http.get<Permiso>(this.cs.base + 'permisos/' + id, this.cs.httpOptions);
  }

  save(permisos: Permiso): Observable<Permiso> {
    return this.http.put<Permiso>(this.cs.base + 'permisos', permisos, this.cs.httpOptions);
  }

  insert(permisos: Permiso): Observable<Permiso> {
    return this.http.post<Permiso>(this.cs.base + 'permisos', permisos, this.cs.httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.cs.base + 'permisos/' + id, this.cs.httpOptions);
  }
}
