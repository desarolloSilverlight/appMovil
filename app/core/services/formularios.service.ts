import {Injectable} from '@angular/core';
import {Formularios} from '../models/Formularios';
import {Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormulariosService {

  constructor(private http: HttpClient, private cs: ConfigService) {
  }

  list(formularios: Formularios): Observable<Formularios[]> {
    return this.http.post<Formularios[]>(this.cs.base + 'formularios/list', formularios, this.cs.httpOptions);
  }

  get(id: any): Observable<Formularios> {
    return this.http.get<Formularios>(this.cs.base + 'formularios/' + id, this.cs.httpOptions);
  }

  save(formularios: Formularios): Observable<Formularios> {
    return this.http.put<Formularios>(this.cs.base + 'formularios', formularios, this.cs.httpOptions);
  }

  insert(formularios: Formularios): Observable<Formularios> {
    return this.http.post<Formularios>(this.cs.base + 'formularios', formularios, this.cs.httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.cs.base + 'formularios/' + id, this.cs.httpOptions);
  }
}