import {Injectable} from '@angular/core';
import {CalCuerpoFlujo} from '../models/CalCuerpoFlujo';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalCuerpoFlujoService {

  constructor(private http: HttpClient, private cs: ConfigService) {
  }

  list(calCuerpoFlujo: CalCuerpoFlujo): Observable<CalCuerpoFlujo[]> {
    return this.http.post<CalCuerpoFlujo[]>(this.cs.base + 'calCuerpoFlujo/list', calCuerpoFlujo, this.cs.httpOptions);
  }

  get(id: any): Observable<CalCuerpoFlujo> {
    return this.http.get<CalCuerpoFlujo>(this.cs.base + 'calCuerpoFlujo/' + id, this.cs.httpOptions);
  }

  save(calCuerpoFlujo: CalCuerpoFlujo): Observable<CalCuerpoFlujo> {
    return this.http.put<CalCuerpoFlujo>(this.cs.base + 'calCuerpoFlujo', calCuerpoFlujo, this.cs.httpOptions);
  }

  insert(calCuerpoFlujo: CalCuerpoFlujo): Observable<CalCuerpoFlujo> {
    return this.http.post<CalCuerpoFlujo>(this.cs.base + 'calCuerpoFlujo', calCuerpoFlujo, this.cs.httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.cs.base + 'calCuerpoFlujo/' + id, this.cs.httpOptions);
  }
}