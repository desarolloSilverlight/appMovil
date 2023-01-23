import {Injectable} from '@angular/core';
import {SbCausasEstres} from '../models/SbCausasEstres';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SbCausasEstresService {

  constructor(private http: HttpClient, private cs: ConfigService) {
  }

  list(sbCausasEstres: SbCausasEstres): Observable<SbCausasEstres[]> {
    return this.http.post<SbCausasEstres[]>(this.cs.base + 'sbCausasEstres/list', sbCausasEstres, this.cs.httpOptions);
  }

  listVi(sbCausasEstres: SbCausasEstres): Observable<SbCausasEstres[]> {
    return this.http.post<SbCausasEstres[]>(this.cs.base + 'sbCausasEstres/listVi', sbCausasEstres, this.cs.httpOptions);
  }

  get(id: any): Observable<SbCausasEstres> {
    return this.http.get<SbCausasEstres>(this.cs.base + 'sbCausasEstres/' + id, this.cs.httpOptions);
  }

  save(sbCausasEstres: SbCausasEstres): Observable<SbCausasEstres> {
    return this.http.put<SbCausasEstres>(this.cs.base + 'sbCausasEstres', sbCausasEstres, this.cs.httpOptions);
  }

  insert(sbCausasEstres: SbCausasEstres): Observable<SbCausasEstres> {
    return this.http.post<SbCausasEstres>(this.cs.base + 'sbCausasEstres', sbCausasEstres, this.cs.httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.cs.base + 'sbCausasEstres/' + id, this.cs.httpOptions);

}
}
