import {Injectable} from '@angular/core';
import {GrupoTrabajo} from '../models/GrupoTrabajo';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GrupoTrabajoService {

  constructor(private http: HttpClient, private cs: ConfigService) {

  }
  listVi(grupoTrabajo: GrupoTrabajo): Observable<GrupoTrabajo[]> {
    return this.http.post<GrupoTrabajo[]>(this.cs.base + 'grupoTrabajo/listVi', grupoTrabajo, this.cs.httpOptions);
  }

  list(grupoTrabajo: GrupoTrabajo): Observable<GrupoTrabajo[]> {
    return this.http.post<GrupoTrabajo[]>(this.cs.base + 'grupoTrabajo/list', grupoTrabajo, this.cs.httpOptions);
  }

  get(id: any): Observable<GrupoTrabajo> {
    return this.http.get<GrupoTrabajo>(this.cs.base + 'grupoTrabajo/' + id, this.cs.httpOptions);
  }

  save(grupoTrabajo: GrupoTrabajo): Observable<GrupoTrabajo> {
    return this.http.put<GrupoTrabajo>(this.cs.base + 'grupoTrabajo', grupoTrabajo, this.cs.httpOptions);
  }

  insert(grupoTrabajo: GrupoTrabajo): Observable<GrupoTrabajo> {
    return this.http.post<GrupoTrabajo>(this.cs.base + 'grupoTrabajo', grupoTrabajo, this.cs.httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.cs.base + 'grupoTrabajo/' + id, this.cs.httpOptions);
  }
}