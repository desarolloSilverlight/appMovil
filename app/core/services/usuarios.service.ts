import {Injectable} from '@angular/core';
import {Usuarios} from '../models/Usuarios';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient, private cs: ConfigService) {
  }

  list(usuarios: Usuarios): Observable<Usuarios[]> {
    return this.http.post<Usuarios[]>(this.cs.base + 'usuarios/list', usuarios, this.cs.httpOptions);
  }
  listVi(usuarios: Usuarios): Observable<Usuarios[]> {
    return this.http.post<Usuarios[]>(this.cs.base + 'usuarios/listVi', usuarios, this.cs.httpOptions);
  }

  get(id: any): Observable<Usuarios> {
    return this.http.get<Usuarios>(this.cs.base + 'usuarios/' + id, this.cs.httpOptions);
  }

  save(usuarios: Usuarios): Observable<Usuarios> {
    return this.http.put<Usuarios>(this.cs.base + 'usuarios', usuarios, this.cs.httpOptions);
  }

  insert(usuarios: Usuarios): Observable<Usuarios> {
    return this.http.post<Usuarios>(this.cs.base + 'usuarios', usuarios, this.cs.httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.cs.base + 'usuarios/' + id, this.cs.httpOptions);
  }
}