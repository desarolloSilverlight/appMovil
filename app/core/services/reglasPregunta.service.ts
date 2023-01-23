import {Injectable} from '@angular/core';
import {ReglasPregunta} from '../models/ReglasPregunta';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReglasPreguntaService {

  constructor(private http: HttpClient, private cs: ConfigService) {
  }

  list(reglasPregunta: ReglasPregunta): Observable<ReglasPregunta[]> {
    return this.http.post<ReglasPregunta[]>(this.cs.base + 'reglasPregunta/list', reglasPregunta, this.cs.httpOptions);
  }

  get(id: any): Observable<ReglasPregunta> {
    return this.http.get<ReglasPregunta>(this.cs.base + 'reglasPregunta/' + id, this.cs.httpOptions);
  }

  save(reglasPregunta: ReglasPregunta): Observable<ReglasPregunta> {
    return this.http.put<ReglasPregunta>(this.cs.base + 'reglasPregunta', reglasPregunta, this.cs.httpOptions);
  }

  insert(reglasPregunta: ReglasPregunta): Observable<ReglasPregunta> {
    return this.http.post<ReglasPregunta>(this.cs.base + 'reglasPregunta', reglasPregunta, this.cs.httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.cs.base + 'reglasPregunta/' + id, this.cs.httpOptions);
  }
}