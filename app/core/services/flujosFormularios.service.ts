import {Injectable} from '@angular/core';
import {FlujosFormularios} from '../models/FlujosFormularios';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlujosFormulariosService {

  constructor(private http: HttpClient, private cs: ConfigService) {
  }

  list(flujosFormularios: FlujosFormularios): Observable<FlujosFormularios[]> {
    return this.http.post<FlujosFormularios[]>(this.cs.base + 'flujosFormularios/list', flujosFormularios, this.cs.httpOptions);
  }

  get(id: any): Observable<FlujosFormularios> {
    return this.http.get<FlujosFormularios>(this.cs.base + 'flujosFormularios/' + id, this.cs.httpOptions);
  }

  save(flujosFormularios: FlujosFormularios): Observable<FlujosFormularios> {
    return this.http.put<FlujosFormularios>(this.cs.base + 'flujosFormularios', flujosFormularios, this.cs.httpOptions);
  }

  insert(flujosFormularios: FlujosFormularios): Observable<FlujosFormularios> {
    return this.http.post<FlujosFormularios>(this.cs.base + 'flujosFormularios', flujosFormularios, this.cs.httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.cs.base + 'flujosFormularios/' + id, this.cs.httpOptions);
  }
}