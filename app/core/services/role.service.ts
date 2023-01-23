import {Injectable} from '@angular/core';
import {Rol} from '../models/Rol';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';
import {ModuloOpcionRol} from '../models/ModuloOpcionRol';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient, private cs: ConfigService) {
  }

  list(roles: Rol): Observable<Rol[]> {
    return this.http.post<Rol[]>(this.cs.base + 'roles/list', roles, this.cs.httpOptions);
  }

  get(id: any): Observable<Rol> {
    return this.http.get<Rol>(this.cs.base + 'roles/' + id, this.cs.httpOptions);
  }

  save(roles: Rol): Observable<Rol> {
    return this.http.put<Rol>(this.cs.base + 'roles', roles, this.cs.httpOptions);
  }

  insert(roles: Rol): Observable<Rol> {
    return this.http.post<Rol>(this.cs.base + 'roles', roles, this.cs.httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.cs.base + 'roles/' + id, this.cs.httpOptions);
  }

  listPermisos(permiso: ModuloOpcionRol) {
    return this.http.post<ModuloOpcionRol[]>(`${this.cs.base}viModulosOpcionesRoles`, permiso, this.cs.httpOptions);
  }
}
