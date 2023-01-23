import {Injectable} from '@angular/core';
import {UsrCausaEstres} from '../models/UsrCausaEstres';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsrCausaEstresService {

  constructor(private http: HttpClient, private cs: ConfigService) {
  }

  list(usrCausaEstres: UsrCausaEstres): Observable<UsrCausaEstres[]> {
    return this.http.post<UsrCausaEstres[]>(this.cs.base + 'usrCausaEstres/list', usrCausaEstres, this.cs.httpOptions);
  }

  get(id: any): Observable<UsrCausaEstres> {
    return this.http.get<UsrCausaEstres>(this.cs.base + 'usrCausaEstres/' + id, this.cs.httpOptions);
  }

  save(usrCausaEstres: UsrCausaEstres): Observable<UsrCausaEstres> {
    return this.http.put<UsrCausaEstres>(this.cs.base + 'usrCausaEstres', usrCausaEstres, this.cs.httpOptions);
  }

  insert(usrCausaEstres: UsrCausaEstres): Observable<UsrCausaEstres> {
    return this.http.post<UsrCausaEstres>(this.cs.base + 'usrCausaEstres', usrCausaEstres, this.cs.httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.cs.base + 'usrCausaEstres/' + id, this.cs.httpOptions);
  }
}