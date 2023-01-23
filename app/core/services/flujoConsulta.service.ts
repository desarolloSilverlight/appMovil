import {Injectable} from '@angular/core';
import {FlujoConsulta} from '../models/FlujoConsulta';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlujoConsultaService {

  constructor(private http: HttpClient, private cs: ConfigService) {
  }

  list(flujoConsulta: FlujoConsulta): Observable<FlujoConsulta[]> {
    return this.http.post<FlujoConsulta[]>(this.cs.base + 'flujoConsulta/list', flujoConsulta, this.cs.httpOptions);
  }

  get(id: any): Observable<FlujoConsulta> {
    return this.http.get<FlujoConsulta>(this.cs.base + 'flujoConsulta/' + id, this.cs.httpOptions);
  }

  save(flujoConsulta: FlujoConsulta): Observable<FlujoConsulta> {
    return this.http.put<FlujoConsulta>(this.cs.base + 'flujoConsulta', flujoConsulta, this.cs.httpOptions);
  }

  insert(flujoConsulta: FlujoConsulta): Observable<FlujoConsulta> {
    return this.http.post<FlujoConsulta>(this.cs.base + 'flujoConsulta', flujoConsulta, this.cs.httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.cs.base + 'flujoConsulta/' + id, this.cs.httpOptions);
  }
}