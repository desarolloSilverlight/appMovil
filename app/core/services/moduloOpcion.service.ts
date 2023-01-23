import {Injectable} from '@angular/core';
import {ModuloOpcion} from '../models/ModuloOpcion';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModuloOpcioneService {

  constructor(private http: HttpClient, private cs: ConfigService) {
  }

  list(modulosOpciones: ModuloOpcion): Observable<ModuloOpcion[]> {
    return this.http.post<ModuloOpcion[]>(this.cs.base + 'modulosOpciones/list', modulosOpciones, this.cs.httpOptions);
  }

  listVi(modulosOpciones: ModuloOpcion): Observable<ModuloOpcion[]> {
    return this.http.post<ModuloOpcion[]>(this.cs.base + 'modulosOpciones/listVi', modulosOpciones, this.cs.httpOptions);
  }

  get(id: any): Observable<ModuloOpcion> {
    return this.http.get<ModuloOpcion>(this.cs.base + 'modulosOpciones/' + id, this.cs.httpOptions);
  }

  save(modulosOpciones: ModuloOpcion): Observable<ModuloOpcion> {
    return this.http.put<ModuloOpcion>(this.cs.base + 'modulosOpciones', modulosOpciones, this.cs.httpOptions);
  }

  insert(modulosOpciones: ModuloOpcion): Observable<ModuloOpcion> {
    return this.http.post<ModuloOpcion>(this.cs.base + 'modulosOpciones', modulosOpciones, this.cs.httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.cs.base + 'modulosOpciones/' + id, this.cs.httpOptions);
  }
}
