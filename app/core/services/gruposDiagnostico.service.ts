import {Injectable} from '@angular/core';
import {GruposDiagnostico} from '../models/GruposDiagnostico';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GruposDiagnosticoService {

  constructor(private http: HttpClient, private cs: ConfigService) {
  }

  list(gruposDiagnostico: GruposDiagnostico): Observable<GruposDiagnostico[]> {
    return this.http.post<GruposDiagnostico[]>(this.cs.base + 'gruposDiagnostico/list', gruposDiagnostico, this.cs.httpOptions);
  }

  get(id: any): Observable<GruposDiagnostico> {
    return this.http.get<GruposDiagnostico>(this.cs.base + 'gruposDiagnostico/' + id, this.cs.httpOptions);
  }

  save(gruposDiagnostico: GruposDiagnostico): Observable<GruposDiagnostico> {
    return this.http.put<GruposDiagnostico>(this.cs.base + 'gruposDiagnostico', gruposDiagnostico, this.cs.httpOptions);
  }

  insert(gruposDiagnostico: GruposDiagnostico): Observable<GruposDiagnostico> {
    return this.http.post<GruposDiagnostico>(this.cs.base + 'gruposDiagnostico', gruposDiagnostico, this.cs.httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.cs.base + 'gruposDiagnostico/' + id, this.cs.httpOptions);
  }
}