import {Injectable} from '@angular/core';
import {UsuarioGrupoTrabajo} from '../models/UsuarioGrupoTrabajo';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGrupoTrabajoService {

  constructor(private http: HttpClient, private cs: ConfigService) {
  }

  list(usuarioGrupoTrabajo: UsuarioGrupoTrabajo): Observable<UsuarioGrupoTrabajo[]> {
    return this.http.post<UsuarioGrupoTrabajo[]>(this.cs.base + 'usuarioGrupoTrabajo/list', usuarioGrupoTrabajo, this.cs.httpOptions);
  }

  listVi(usuarioGrupoTrabajo: UsuarioGrupoTrabajo): Observable<UsuarioGrupoTrabajo[]> {
    return this.http.post<UsuarioGrupoTrabajo[]>(this.cs.base + 'usuarioGrupoTrabajo/listVi', usuarioGrupoTrabajo, this.cs.httpOptions);
  }

  get(id: any): Observable<UsuarioGrupoTrabajo> {
    return this.http.get<UsuarioGrupoTrabajo>(this.cs.base + 'usuarioGrupoTrabajo/' + id, this.cs.httpOptions);
  }

  save(usuarioGrupoTrabajo: UsuarioGrupoTrabajo): Observable<UsuarioGrupoTrabajo> {
    return this.http.put<UsuarioGrupoTrabajo>(this.cs.base + 'usuarioGrupoTrabajo', usuarioGrupoTrabajo, this.cs.httpOptions);
  }

  insert(usuarioGrupoTrabajo: UsuarioGrupoTrabajo): Observable<UsuarioGrupoTrabajo> {
    return this.http.post<UsuarioGrupoTrabajo>(this.cs.base + 'usuarioGrupoTrabajo', usuarioGrupoTrabajo, this.cs.httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.cs.base + 'usuarioGrupoTrabajo/' + id, this.cs.httpOptions);
  }
}