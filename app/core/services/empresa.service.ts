import {Injectable} from '@angular/core';
import {Empresa} from '../models/Empresa';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient, private cs: ConfigService) {
  }


  listVi(empresas: Empresa): Observable<Empresa[]> {
    return this.http.post<Empresa[]>(this.cs.base + 'empresas/listVi', empresas, this.cs.httpOptions);
  }

  list(empresas: Empresa): Observable<Empresa[]> {
    return this.http.post<Empresa[]>(this.cs.base + 'empresas/list', empresas, this.cs.httpOptions);
  }

  get(id: any): Observable<Empresa> {
    return this.http.get<Empresa>(this.cs.base + 'empresas/' + id, this.cs.httpOptions);
  }

  save(empresas: Empresa): Observable<Empresa> {
    return this.http.put<Empresa>(this.cs.base + 'empresas', empresas, this.cs.httpOptions);
  }

  insert(empresas: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(this.cs.base + 'empresas', empresas, this.cs.httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.cs.base + 'empresas/' + id, this.cs.httpOptions);
  }
}
