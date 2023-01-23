import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';
import {TpParametro} from '../models/TpParametro';

@Injectable({
  providedIn: 'root'
})
export class TpParametroService {

  constructor(private http: HttpClient, private cs: ConfigService) {
  }

  list(tpTpParametros: TpParametro): Observable<TpParametro[]> {
    return this.http.post<TpParametro[]>(this.cs.base + 'tpParametros/list', tpTpParametros, this.cs.httpOptions);
  }

  get(id: any): Observable<TpParametro> {
    return this.http.get<TpParametro>(this.cs.base + 'tpParametros/' + id, this.cs.httpOptions);
  }

  save(tpTpParametros: TpParametro): Observable<TpParametro> {
    return this.http.put<TpParametro>(this.cs.base + 'tpParametros', tpTpParametros, this.cs.httpOptions);
  }

  insert(tpTpParametros: TpParametro): Observable<TpParametro> {
    return this.http.post<TpParametro>(this.cs.base + 'tpParametros', tpTpParametros, this.cs.httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.cs.base + 'tpParametros/' + id, this.cs.httpOptions);
  }
}
