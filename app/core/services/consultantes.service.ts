import {Injectable} from '@angular/core';
import {Consultantes} from '../models/Consultantes';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';
import {retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ConsultantesService {

  constructor(private http: HttpClient, private cs: ConfigService) {
  }

  list(consultantes: Consultantes): Observable<Consultantes[]> {
    return this.http.post<Consultantes[]>(this.cs.base + 'consultantes/list', consultantes, this.cs.httpOptions).pipe(retry(3));
  }

  get(id: any): Observable<Consultantes> {
    return this.http.get<Consultantes>(this.cs.base + 'consultantes/' + id, this.cs.httpOptions);
  }

  save(consultantes: Consultantes): Observable<Consultantes> {
    return this.http.put<Consultantes>(this.cs.base + 'consultantes', consultantes, this.cs.httpOptions);
  }

  insert(consultantes: Consultantes): Observable<Consultantes> {
    return this.http.post<Consultantes>(this.cs.base + 'consultantes', consultantes, this.cs.httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.cs.base + 'consultantes/' + id, this.cs.httpOptions);
  }
}
