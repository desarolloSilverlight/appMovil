import {Injectable} from '@angular/core';
import {TemasConsulta} from '../models/TemasConsulta';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TemasConsultaService {

  constructor(private http: HttpClient, private cs: ConfigService) {
  }

  list(temasConsulta: TemasConsulta): Observable<TemasConsulta[]> {
    return this.http.post<TemasConsulta[]>(this.cs.base + 'temasConsulta/list', temasConsulta, this.cs.httpOptions);
  }

  listVi(temasConsulta: TemasConsulta): Observable<TemasConsulta[]> {
    return this.http.post<TemasConsulta[]>(this.cs.base + 'temasConsulta/listVi', temasConsulta, this.cs.httpOptions);
  }

  get(id: any): Observable<TemasConsulta> {
    return this.http.get<TemasConsulta>(this.cs.base + 'temasConsulta/' + id, this.cs.httpOptions);
  }

  save(temasConsulta: TemasConsulta): Observable<TemasConsulta> {
    return this.http.put<TemasConsulta>(this.cs.base + 'temasConsulta', temasConsulta, this.cs.httpOptions);
  }

  insert(temasConsulta: TemasConsulta): Observable<TemasConsulta> {
    return this.http.post<TemasConsulta>(this.cs.base + 'temasConsulta', temasConsulta, this.cs.httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.cs.base + 'temasConsulta/' + id, this.cs.httpOptions);
  }
}
