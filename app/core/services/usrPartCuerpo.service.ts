import {Injectable} from '@angular/core';
import {UsrPartCuerpo} from '../models/UsrPartCuerpo';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsrPartCuerpoService {

  constructor(private http: HttpClient, private cs: ConfigService) {
  }

  list(usrPartCuerpo: UsrPartCuerpo): Observable<UsrPartCuerpo[]> {
    return this.http.post<UsrPartCuerpo[]>(this.cs.base + 'usrPartCuerpo/list', usrPartCuerpo, this.cs.httpOptions);
  }

  get(id: any): Observable<UsrPartCuerpo> {
    return this.http.get<UsrPartCuerpo>(this.cs.base + 'usrPartCuerpo/' + id, this.cs.httpOptions);
  }

  save(usrPartCuerpo: UsrPartCuerpo): Observable<UsrPartCuerpo> {
    return this.http.put<UsrPartCuerpo>(this.cs.base + 'usrPartCuerpo', usrPartCuerpo, this.cs.httpOptions);
  }

  insert(usrPartCuerpo: UsrPartCuerpo): Observable<UsrPartCuerpo> {
    return this.http.post<UsrPartCuerpo>(this.cs.base + 'usrPartCuerpo', usrPartCuerpo, this.cs.httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.cs.base + 'usrPartCuerpo/' + id, this.cs.httpOptions);
  }
}